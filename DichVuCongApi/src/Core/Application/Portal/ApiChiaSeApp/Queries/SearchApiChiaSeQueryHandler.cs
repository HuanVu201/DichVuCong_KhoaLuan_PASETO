using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;
public class SearchApiChiaSeQueryHandler : IRequestHandler<SearchApiChiaSeQuery, PaginationResponse<LichSuApiChiaSeResponse>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchApiChiaSeQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LichSuApiChiaSeResponse>> Handle(SearchApiChiaSeQuery request, CancellationToken cancellationToken)
    {
        var sql = $@"SELECT ID, MaApiChiaSe, TenApiChiaSe, NoiDung, GioiHan, DuongDan, NgayGoi, SoLuotGoiTrongNgay
                     FROM [Portal].[APIChiaSes] 
                     WHERE DeletedOn is null";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LichSuApiChiaSeResponse>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}