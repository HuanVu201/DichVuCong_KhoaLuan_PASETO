using Dapper;
using FirebaseAdmin.Messaging;
using Hangfire.Server;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Dtos;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Queries;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Infrastructure.Common.Services;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;
using TD.DichVuCongApi.Shared.Notifications;

namespace TD.DichVuCongApi.Infrastructure.FirebaseNotification;
public class FirebaseNotification : IFirebaseNotification
{
    private readonly INotificationSender _notifications;
    private readonly ILogger<FirebaseNotification> _logger;
    private readonly PerformingContext _performingContext;
    private string? _connectionStr;
    public FirebaseNotification(INotificationSender notifications, ILogger<FirebaseNotification> logger, PerformingContext performingContext, IConfiguration configuration)
    {
        _notifications = notifications;
        _logger = logger;
        _connectionStr = configuration.GetValue<string>("ServiceNotificationConnectString");
        _performingContext = performingContext;
        if (!string.IsNullOrEmpty(_connectionStr) && _connectionStr.StartsWith("Crypt:"))
        {
            _connectionStr = _connectionStr.Replace("Crypt:", string.Empty);
            _connectionStr = Encryption.Decrypt(_connectionStr);
        }
    }

    public async Task NotifyAsync(string message, int progress, CancellationToken cancellationToken)
    {
        await _notifications.SendToUserAsync(
            new JobNotification()
            {
                JobId = _performingContext.BackgroundJob.Id,
                Message = message,
                Progress = progress
            },
            string.Empty,
            cancellationToken);
    }

    public async Task HandleMultiMessage(List<CreateFirebaseNotificationCommand> requests, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(_connectionStr))
        {
            return;
        }

        for (int i = 0; i < requests.Count; i++)
        {
            var request = requests[i];
            await Handle(request.Topic, request, request.HoSoId, cancellationToken);
        }
    }

    public async Task Handle(string topic, CreateFirebaseNotificationCommand request, Guid? id, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(_connectionStr))
        {
            return;
        }

        if (string.IsNullOrEmpty(request.Type))
        {
            _logger.LogError($"FirebaseNotification: Không có Type, {JsonConvert.SerializeObject(request)}");
            return;
        }

        try
        {
            var res = await InsertNotification(request, cancellationToken);
            if (res != null && res != default)
            {
                var data = new Domain.Catalog.Notification((Guid)res, request.HoSoId, request.Topic, request.Title, request.Content, request.Description, request.IsRead, request.LoaiThongBao, request.Link, request.Data ?? string.Empty, request.FullPath, request.Type);
                var message = new Message()
                {
                    Topic = topic,
                    Data = new Dictionary<string, string>()
                    {
                        ["Data"] = JsonConvert.SerializeObject(data),

                        // ["Data"] = request?.Data ?? string.Empty,
                        ["Id"] = id.ToString() ?? string.Empty,
                        ["ImageUrl"] = string.Empty,
                    },
                    Notification = new FirebaseAdmin.Messaging.Notification
                    {
                        Title = request.Title,
                        Body = request.Content,
                        ImageUrl = null
                    },
                    Android = new FirebaseAdmin.Messaging.AndroidConfig
                    {
                        Notification = new FirebaseAdmin.Messaging.AndroidNotification
                        {
                            ChannelId = "DVCThanhHoa"
                        },
                        Priority = Priority.High

                    },
                    Apns = new FirebaseAdmin.Messaging.ApnsConfig
                    {
                        Headers = new Dictionary<string, string>()
                        {
                            ["apns-priority"] = "5",
                        },
                        Aps = new FirebaseAdmin.Messaging.Aps
                        {
                            Sound = "default",
                            ThreadId = "DVCThanhHoa",
                            ContentAvailable = true
                        }
                    }
                };
                var messaging = FirebaseMessaging.DefaultInstance;
                string? result = await messaging.SendAsync(message, false, cancellationToken);

            }
            else
            {
                _logger.LogError("Thêm mới thất bại");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }

    public async Task<int> UpdateIsRead(UpdateIsReadNotificationCommand req, CancellationToken cancellationToken = default)
    {
        try
        {
            using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            {
                targetConnection.Open();
                string createTableIfNotExistSql = @$"
                    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'FirebaseNotifications')
                        BEGIN
                            CREATE TABLE FirebaseNotifications (
                                Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                                HoSoId UNIQUEIDENTIFIER NOT NULL,
                                MaHoSo VARCHAR(50),
                                Topic VARCHAR(50),
                                Title NVARCHAR(256),
                                Content NVARCHAR(2000),
                                Description NVARCHAR(500),
                                IsRead BIT NOT NULL,
                                Type VARCHAR(100),
                                LoaiThongBao VARCHAR(100),
                                Link NVARCHAR(256),
                                Data NVARCHAR(1000),
                                CreatedOn datetime2(7),
                                FullPath NVARCHAR(256)
                            );
                        END;";
                string createIndexIfNotExistSql = @$"
                    IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('FirebaseNotifications') AND name = 'IX_FirebaseNotifications_Service')
                    BEGIN
                        CREATE INDEX IX_FirebaseNotifications_Service ON {SchemaNames.Dbo}.{TableNames.FirebaseNotifications} (MaHoSo, HoSoId);
                    END;";
                string sql = @$"
                    {createTableIfNotExistSql}
                    {createIndexIfNotExistSql}
                    UPDATE {SchemaNames.Dbo}.{TableNames.FirebaseNotifications} SET IsRead = 1 WHERE Id = @Id;";
                return await targetConnection.ExecuteAsync(sql, req);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return 0;
        }
    }

    public async Task<PaginationResponse<SearchNotificationDto>> SearchNotification(SearchNotificationQuery request, CancellationToken cancellationToken = default)
    {
        try
        {
            using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            {
                targetConnection.Open();
                string createTableIfNotExistSql = @$"
                    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'FirebaseNotifications')
                        BEGIN
                            CREATE TABLE FirebaseNotifications (
                                Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                                HoSoId UNIQUEIDENTIFIER NOT NULL,
                                MaHoSo VARCHAR(50),
                                Topic VARCHAR(50),
                                Title NVARCHAR(256),
                                Content NVARCHAR(2000),
                                Description NVARCHAR(500),
                                IsRead BIT NOT NULL,
                                Type VARCHAR(100),
                                LoaiThongBao VARCHAR(100),
                                Link NVARCHAR(256),
                                Data NVARCHAR(1000),
                                CreatedOn datetime2(7),
                                FullPath NVARCHAR(256)
                            );
                        END;";
                string createIndexIfNotExistSql = @$"
                    IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('FirebaseNotifications') AND name = 'IX_FirebaseNotifications_Service')
                    BEGIN
                        CREATE INDEX IX_FirebaseNotifications_Service ON {SchemaNames.Dbo}.{TableNames.FirebaseNotifications} (MaHoSo, HoSoId);
                    END;";
                string where = SearchNotificationQueryWhereBuilder.Build(request);
                string insertSql = @$"
                    {createTableIfNotExistSql}
                    {createIndexIfNotExistSql}
                    ";
                await targetConnection.ExecuteAsync(insertSql);
                string sqlSearch = $"SELECT Id,HoSoId,MaHoSo,Topic,Type,Title,Content,Description,IsRead,CreatedOn, Link, Data, FullPath FROM {SchemaNames.Dbo}.{TableNames.FirebaseNotifications} {where}";
                return await targetConnection.PaginatedListSingleQueryAsync<SearchNotificationDto>(sqlSearch, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, request);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return new PaginationResponse<SearchNotificationDto>()
            {
                Data = null
            };
        }

    }

    public async Task<Guid?> InsertNotification(CreateFirebaseNotificationCommand req, CancellationToken cancellationToken = default)
    {
        try
        {
            using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            {
                targetConnection.Open();
                string createTableIfNotExistSql = @$"
                    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'FirebaseNotifications')
                        BEGIN
                            CREATE TABLE FirebaseNotifications (
                                Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                                HoSoId UNIQUEIDENTIFIER NOT NULL,
                                MaHoSo VARCHAR(50),
                                Topic VARCHAR(50),
                                Title NVARCHAR(256),
                                Content NVARCHAR(2000),
                                Description NVARCHAR(500),
                                IsRead BIT NOT NULL,
                                Type VARCHAR(100),
                                LoaiThongBao VARCHAR(100),
                                Link NVARCHAR(256),
                                Data NVARCHAR(1000),
                                CreatedOn datetime2(7),
                                FullPath NVARCHAR(256)
                            );
                        END;";
                string createIndexIfNotExistSql = @$"
                    IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('FirebaseNotifications') AND name = 'IX_FirebaseNotifications_Service')
                    BEGIN
                        CREATE INDEX IX_FirebaseNotifications_Service ON {SchemaNames.Dbo}.{TableNames.FirebaseNotifications} (MaHoSo, HoSoId);
                    END;";
                string sql = @$"
                    {createTableIfNotExistSql}
                    {createIndexIfNotExistSql}
                    INSERT INTO {SchemaNames.Dbo}.{TableNames.FirebaseNotifications}
                    (HoSoId, MaHoSo, Topic, Title, Content, Description, IsRead, Type, CreatedOn, LoaiThongBao, Link, Data, FullPath)
                    OUTPUT Inserted.ID
                    VAlUES
                    (@HoSoId, @MaHoSo, @Topic, @Title, @Content, @Description, @IsRead, @Type, @CreatedOn, @LoaiThongBao, @Link, @Data, @FullPath);";
                var insertedId = await targetConnection.QuerySingleAsync<Guid>(sql, req);

                return insertedId;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return null;
        }

    }
}
