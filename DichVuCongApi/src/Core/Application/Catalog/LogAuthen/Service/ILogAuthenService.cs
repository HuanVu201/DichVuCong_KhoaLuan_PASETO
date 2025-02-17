using TD.DichVuCongApi.Application.Catalog.LogAuthen.Queries;
using TD.DichVuCongApi.Catalog.Catalog.LogAuthen.Queries;

namespace TD.DichVuCongApi.Application.Catalog.LogAuthen.Service;
public interface ILogAuthenService : IScopedService
{
    public Task<PaginationResponse<LogAuthenDto>> SearchLogAuthenAsync(string sql, SearchLogAuthenQuery req, CancellationToken cancellationToken);
    public Task<LogAuthenDetailDto> GetLogAuthenDetailAsync(GetLogAuthenQuery req);
    public Task<Result<CountAccessPortalDto>> CountAccessPortal(string sqlQuery);

}

public class CountAccessPortalDto
{
    public int CountAccessPortal { get; set; }
    public int CountAccessTotalPortal { get; set; }
}