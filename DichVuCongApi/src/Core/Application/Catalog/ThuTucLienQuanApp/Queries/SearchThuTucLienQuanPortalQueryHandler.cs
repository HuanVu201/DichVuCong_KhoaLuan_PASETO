using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Queries;
public class SearchThuTucLienQuanPortalQueryHandler : IRequestHandler<SearchThuTucLienQuanPortalQuery, PaginationResponse<ThuTucLienQuanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly IDapperRepository _dapperRepository;
    public SearchThuTucLienQuanPortalQueryHandler(IDapperRepository dapperRepository, ICacheService cacheKeyService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheKeyService;
    }
    public async Task<PaginationResponse<ThuTucLienQuanDto>> Handle(SearchThuTucLienQuanPortalQuery request, CancellationToken cancellationToken)
    {
        string sql = $@"SELECT ID,ThuTu,ThuTucid,ThuTucLienQuanId FROM Catalog.ThuTucLienQuans WHERE DeletedOn is null";

        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucLienQuanDto>(sql, request.PageSize, "SoThuTu ASC", cancellationToken, request.PageNumber, request), TimeSpan.FromMinutes(60 * 12),
            cancellationToken);

        return data;
    }
}