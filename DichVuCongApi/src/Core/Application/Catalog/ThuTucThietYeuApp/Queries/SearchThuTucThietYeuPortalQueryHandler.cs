using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Queries;
public class SearchThuTucThietYeuPortalQueryHandler : IRequestHandler<SearchThuTucThietYeuPortalQuery, PaginationResponse<ThuTucThietYeuDto>>
{
    private readonly ICacheService _cacheService;
    private readonly IDapperRepository _dapperRepository;
    public SearchThuTucThietYeuPortalQueryHandler(IDapperRepository dapperRepository, ICacheService cacheKeyService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheKeyService;
    }
    public async Task<PaginationResponse<ThuTucThietYeuDto>> Handle(SearchThuTucThietYeuPortalQuery request, CancellationToken cancellationToken)
    {
        string sql = $@"SELECT ID, MaTTHC, TenTTHC, LinkDVC, SoThuTu FROM Catalog.ThuTucThietYeus WHERE DeletedOn is null";

        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucThietYeuDto>(sql, request.PageSize, "SoThuTu ASC", cancellationToken, request.PageNumber, request), TimeSpan.FromMinutes(60 * 12),
            cancellationToken);

        return data;
    }
}