//using FirebaseAdmin.Messaging;
//using Hangfire;
//using Hangfire.Console.Extensions;
//using Hangfire.Server;
//using MediatR;
//using Microsoft.Extensions.Logging;
//using TD.DichVuCongApi.Application.Common.Interfaces;
//using TD.DichVuCongApi.Application.Common.Persistence;
//using TD.DichVuCongApi.Shared.Notifications;

//namespace TD.WebApi.Infrastructure.Catalog;

//public class SendNotificationJob : ISendNotificationJob
//{
//    private readonly ILogger<SendNotificationJob> _logger;
//    private readonly ISender _mediator;
//    private readonly IProgressBarFactory _progressBar;
//    private readonly PerformingContext _performingContext;
//    private readonly INotificationSender _notifications;
//    private readonly IDapperRepository _dapperRepository;

//    public SendNotificationJob(
//        ILogger<SendNotificationJob> logger,
//        IDapperRepository dapperRepository,
//        ISender mediator,
//        IProgressBarFactory progressBar,
//        PerformingContext performingContext,
//        INotificationSender notifications)
//    {
//        _dapperRepository = dapperRepository;
//        _logger = logger;
//        _mediator = mediator;
//        _progressBar = progressBar;
//        _performingContext = performingContext;
//        _notifications = notifications;
//    }

//    private async Task NotifyAsync(string message, int progress, CancellationToken cancellationToken)
//    {
//        await _notifications.SendToUserAsync(
//            new JobNotification()
//            {
//                JobId = _performingContext.BackgroundJob.Id,
//                Message = message,
//                Progress = progress
//            },
//            string.Empty,
//            cancellationToken);
//    }

//    [Queue("notdefault")]
//    public async Task SendNotificationAsync(SendNotificationRequest request, CancellationToken cancellationToken)
//    {
//        await NotifyAsync("FetchProductAsync processing has started", 0, cancellationToken);
//        foreach (string topic in request.Topics)
//        {
//            await Handle(topic, request, null, cancellationToken);
//        }

//        await NotifyAsync("FetchProductAsync successfully completed", 0, cancellationToken);
//    }

//    public class DataNotification
//    {
//        public string? NoiDung { get; set; }
//        public string? ImageUrl { get; set; }
//    }

//    public async Task Handle(string topic, SendNotificationRequest request, Guid? id, CancellationToken cancellationToken)
//    {
//        try
//        {
//            var message = new Message()
//            {
//                Topic = topic,
//                Data = new Dictionary<string, string>()
//                {
//                    ["Data"] = request?.Data ?? string.Empty,
//                    ["Id"] = id.ToString() ?? string.Empty,
//                    ["ImageUrl"] = string.Empty,
//                },
//                Notification = new FirebaseAdmin.Messaging.Notification
//                {
//                    Title = request.Title,
//                    Body = request.Content,
//                    ImageUrl = null
//                },
//                Android = new FirebaseAdmin.Messaging.AndroidConfig
//                {
//                    Notification = new FirebaseAdmin.Messaging.AndroidNotification
//                    {
//                        ChannelId = "CodeMath"
//                    },
//                    Priority = Priority.High

//                },
//                Apns = new FirebaseAdmin.Messaging.ApnsConfig
//                {
//                    Headers = new Dictionary<string, string>()
//                    {
//                        ["apns-priority"] = "5",
//                    },
//                    Aps = new FirebaseAdmin.Messaging.Aps
//                    {
//                        Sound = "default",
//                        ThreadId = "CodeMath",
//                        ContentAvailable = true
//                    }
//                }
//            };
//            var messaging = FirebaseMessaging.DefaultInstance;
//            string? result = await messaging.SendAsync(message, false, cancellationToken);


//            var tmp = await _mediator.Send(
//                    new CreateNotificationRequest
//                    {
//                        Topic = topic,
//                        Title = request.Title,
//                        Content = request.Content,
//                        Description = request.Description,
//                        Link = request.Link,
//                        DeepLink = request.DeepLink,
//                        CommentId = request.CommentId,
//                        DiscussionId = request.DiscussionId,
//                        Code = null,
//                        Data = request.Data,
//                        IsRead = false,
//                    },
//                    cancellationToken);
//        }
//        catch
//        {

//        }
//    }


//    [Queue("notdefault")]
//    public async Task XuLyGuiThongBaoBuoiHocBatDauAsync(CancellationToken cancellationToken)
//    {
//        await NotifyAsync("FetchProductAsync processing has started", 0, cancellationToken);

//        string query = @"SELECT ClassSessions.* , CourseClasses.CourseId AS CourseId FROM [Catalog].[ClassSessions] ClassSessions INNER JOIN [Catalog].CourseClasses CourseClasses ON CourseClasses.Id = ClassSessions.CourseClassId  WHERE (ClassSessions.[Status] IS NULL OR ClassSessions.[Status] != 1) AND ClassSessions.StartTime <= DATEADD(MINUTE, 15, GETDATE()) AND ClassSessions.EndTime >= GETDATE() AND ClassSessions.DeletedOn IS NULL  AND ClassSessions.TenantId = 'root'";
//        var lst = await _dapperRepository.QueryAsyncNew<ClassSessionDto>(query, cancellationToken);

//        foreach (var item in lst)
//        {
//            var lstUser = await _dapperRepository.QueryAsyncNew<CourseClassUserDto>($"SELECT * FROM [Catalog].[CourseClassUsers] Where CourseClassId =  '{item.CourseClassId}' AND DeletedOn IS NULL ", cancellationToken);

//            List<string> lstTopics = new List<string>();

//            if (lstUser != null)
//            {
//                foreach (var useritem in lstUser)
//                {
//                    if (useritem != null)
//                    {
//                        lstTopics.Add(useritem.UserId.ToString());
//                    }
//                }
//            }

//            await _mediator.Send(
//               new SendNotificationRequest
//               {
//                   Topics = lstTopics,
//                   Title = $"Buổi học {item.Name} sắp bắt đầu",
//                   Content = $"Buổi học {item.Name} bắt đầu lúc {(item?.StartTime ?? DateTime.Now).ToString("dd/MM/yyyy HH:mm")}",
//                   Description = $"Buổi học {item.Name} bắt đầu lúc {(item?.StartTime ?? DateTime.Now).ToString("dd/MM/yyyy HH:mm")}",
//                   Link = $"online-detail/{item.CourseClassId}?idCourse={item.CourseId}",
//                   DeepLink = "Online_DetailScreen",
//                   DiscussionId = $"{item.CourseClassId}",
//                   Code = null,
//                   Data = null,
//                   IsRead = false,
//               },
//               cancellationToken);

//            await _dapperRepository.ExecuteAsync($"UPDATE [Catalog].[ClassSessions] SET [Status] =  1 WHERE Id = '{item.Id}' ", cancellationToken);
//        }

//        await NotifyAsync("FetchProductAsync successfully completed", 0, cancellationToken);
//    }


//    [Queue("notdefault")]
//    public async Task BaoCaoDoanhThuTuanAsync(CancellationToken cancellationToken)
//    {
//        await NotifyAsync("FetchProductAsync processing has started", 0, cancellationToken);

//        string[]? lstEmail = null;

//        string itemConfig = await GetValueAppConfigs("EmailReceiveNotifications");
//        if (!string.IsNullOrEmpty(itemConfig))
//        {
//            lstEmail = itemConfig.Split(';', StringSplitOptions.RemoveEmptyEntries);
//        }

//        if (lstEmail != null && lstEmail.Any())
//        {
//            DateTime currentDate = DateTime.Now;
//            DateTime firstDayOfLastWeek = currentDate.AddDays(-(int)currentDate.DayOfWeek - 7);
//            DateTime lastDayOfLastWeek = firstDayOfLastWeek.AddDays(6);

//            var tmp = await _mediator.Send(new ReportDoanhThuTheoUserExport() { FromDate = firstDayOfLastWeek, ToDate = lastDayOfLastWeek, Type = 0 }, cancellationToken);

//        }

//        await NotifyAsync("FetchProductAsync successfully completed", 0, cancellationToken);
//    }

//    [Queue("notdefault")]
//    public async Task BaoCaoDoanhThuThangAsync(CancellationToken cancellationToken)
//    {
//        await NotifyAsync("FetchProductAsync processing has started", 0, cancellationToken);

//        await NotifyAsync("FetchProductAsync processing has started", 0, cancellationToken);

//        string[]? lstEmail = null;

//        string itemConfig = await GetValueAppConfigs("EmailReceiveNotifications");
//        if (!string.IsNullOrEmpty(itemConfig))
//        {
//            lstEmail = itemConfig.Split(';', StringSplitOptions.RemoveEmptyEntries);
//        }

//        if (lstEmail != null && lstEmail.Any())
//        {
//            DateTime currentDate = DateTime.Now;
//            DateTime firstDayOfLastMonth = new DateTime(currentDate.Year, currentDate.Month - 1, 1);
//            DateTime lastDayOfLastMonth = firstDayOfLastMonth.AddMonths(1).AddDays(-1);

//            var tmp = await _mediator.Send(new ReportDoanhThuTheoUserExport() { FromDate = firstDayOfLastMonth, ToDate = lastDayOfLastMonth, Type = 0 }, cancellationToken);

//        }

//        await NotifyAsync("FetchProductAsync successfully completed", 0, cancellationToken);
//    }

//    private async Task<string> GetValueAppConfigs(string key)
//    {
//        var item = await _dapperRepository.QueryFirstOrDefaultObjectAsync<AppConfigDto>($"SELECT TOP (1) *  FROM [Catalog].[AppConfigs] WHERE [Key] = '{key}' AND DeletedOn IS NULL");
//        if (item != null && !string.IsNullOrEmpty(item.Value))
//        {
//            return item.Value;
//        }

//        return string.Empty;
//    }
//}