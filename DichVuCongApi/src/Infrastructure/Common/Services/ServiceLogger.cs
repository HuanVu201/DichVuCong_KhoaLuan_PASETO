using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Ocsp;
using Serilog;
using System.Data;
using System.Threading;
using TD.DichVuCongApi.Application.Business.LogSendEmailApp;
using TD.DichVuCongApi.Application.Business.LogSendEmailApp.Queries;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;

namespace TD.DichVuCongApi.Infrastructure.Common.Services;
public class ServiceLogger : IServiceLogger
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<ServiceLogger> _logger;
    //private readonly string? _connectionStr;
    public ServiceLogger(IDapperRepository dapperRepository, IConfiguration configuration, ILogger<ServiceLogger> logger)
    {
        _dapperRepository = dapperRepository;
        _logger = logger;
        //_connectionStr = configuration?.GetValue<string>("ServiceLoggerConnectString");
        //if (_connectionStr.StartsWith("Crypt:"))
        //{
        //    _connectionStr = _connectionStr.Replace("Crypt:", string.Empty);
        //    _connectionStr = Encryption.Decrypt(_connectionStr);
        //}
    }

    private bool Validate()
    {
        //if (_connectionStr == null)
        //{
        //    return false;
        //}

        return true;
    }

    public async Task LogAsync<T>(ServiceLoggerRequestParams req)
        where T : IEnableServiceLogger
    {
        bool hasConnectStr = Validate();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");
            return;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    string sql = @$"                    
            //        INSERT INTO ServiceLogs
            //        (CreatedAt, Service, Sender, Receiver, IsSucceed, Request, Response, MaHoSo) VAlUES
            //        (GetDate(), @Service, @Sender, @Receiver, @IsSucceed, @Request, @Response, @MaHoSo);";
            //    await targetConnection.ExecuteAsync(sql, req);
            //}

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Thêm log ServiceLogs that bai");
        }
    }

    public async Task LogAuthenAsync(ServiceLogAuthenRequestParams req)
    {
        bool hasConnectStr = Validate();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");
            return;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    string sql = @$"                   
            //        INSERT INTO LogAuthens
            //        (CreatedAt, Username, Fullname, TypeLogin, Token, TypeUser, Device, IP) VAlUES
            //        (GetDate(), @Username, @Fullname, @TypeLogin, @Token, @TypeUser, @Device, @IP);";
            //    await targetConnection.ExecuteAsync(sql, req);
            //}
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Thêm log Authen that bai");
        }
    }

    public async Task<PaginationResponse<LogSendEmailDto>> GetListAsync(SearchLogSendEmail request)
    {
        bool hasConnectStr = Validate();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");
            return new PaginationResponse<LogSendEmailDto>
            {
                CurrentPage = request.PageNumber,
                PageSize = request.PageSize,
                TotalCount = 0,
                TotalPages = 0,
                Data = Enumerable.Empty<LogSendEmailDto>().ToList()
            };
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();

            //    var where = SearchLogSendEmailQueryWhereBuilder.Build(request);
            //    var sql = $@"
            //    SELECT
            //        Id,
            //        Service,
            //        Sender,
            //        Receiver,
            //        isSucceed,
            //        Request,
            //        Response,
            //        MaHoSo,
            //        CreatedAt
            //    FROM ServiceLogs
            //    {where}
            //    ORDER BY CreatedAt DESC
            //    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;";

            //    var parameters = new
            //    {
            //        Service = request.Service,
            //        Sender = request.Sender,
            //        Receiver = request.Receiver,
            //        MaHoSo= request.MaHoSo,
            //        Request = request.Request,
            //        Offset = (request.PageNumber - 1) * request.PageSize,
            //        PageSize = request.PageSize
            //    };

            //    var items = (await targetConnection.QueryAsync<LogSendEmailDto>(sql, parameters)).ToList();

            //    // Calculate total items
            //    string countSql = $@"
            //    SELECT COUNT(*)
            //    FROM ServiceLogs
            //    {where};";

            //    int totalItems = await targetConnection.ExecuteScalarAsync<int>(countSql, parameters);

            //    return new PaginationResponse<LogSendEmailDto>(items, totalItems, request.PageNumber, request.PageSize);
            //}

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi lấy danh sách log gửi email");
            return new PaginationResponse<LogSendEmailDto>
            {
                CurrentPage = request.PageNumber,
                PageSize = request.PageSize,
                TotalCount = 0,
                TotalPages = 0,
                Data = Enumerable.Empty<LogSendEmailDto>().ToList()
            };
        }
    }



    public async Task<Result<LogSendEmailDto>> GetServiceLogByIdAsync(Guid id)
    {
        bool hasConnectStr = Validate();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");
            return null; // Return null or handle this case as appropriate
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    string sql = @"
            //    SELECT 
            //        Id,
            //        Service,
            //        Sender,
            //        Receiver,
            //        isSucceed,
            //        Request,
            //        Response,
            //        MaHoSo,
            //        CreatedAt
            //    FROM ServiceLogs
            //    WHERE Id = @Id;";

            //    // Query the database and map to LogSendEmailDto
            //    var log = await targetConnection.QueryFirstOrDefaultAsync<LogSendEmailDto>(sql, new { Id = id });
            //    return Result<LogSendEmailDto>.Success(log); // Return the result, or null if no matching record is found
            //}
            return Result<LogSendEmailDto>.Success(new LogSendEmailDto());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi lấy log gửi email theo ID");
            return null; // Return null or handle this case as appropriate
        }
    }

}
