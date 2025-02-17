using TD.DichVuCongApi.Application.Business.LogSendEmailApp;
using TD.DichVuCongApi.Application.Business.LogSendEmailApp.Queries;

namespace TD.DichVuCongApi.Application.Common.ServiceLogger;
public interface IServiceLogger : IScopedService
{
    Task LogAsync<T>(ServiceLoggerRequestParams req)
        where T : IEnableServiceLogger;
    Task LogAuthenAsync(ServiceLogAuthenRequestParams req);

    Task<PaginationResponse<LogSendEmailDto>> GetListAsync(SearchLogSendEmail request);

    Task<Result<LogSendEmailDto>> GetServiceLogByIdAsync(Guid id);
}

public interface IEnableServiceLogger
{

}