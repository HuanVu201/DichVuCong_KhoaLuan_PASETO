using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;
public class SearchLichSuApiChiaSeQueryWhereBuilder
{
    public static string Build(SearchLichSuApiChiaSeQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Id))
            where += " AND api.Id = @Id ";
        if (!string.IsNullOrEmpty(req.MaApiChiaSe))
            where += " AND MaApiChiaSe Like N'%' + @MaApiChiaSe + '%'";
        if (!string.IsNullOrEmpty(req.TenApiChiaSe))
            where += " AND TenApiChiaSe Like N'%' + @TenApiChiaSe + '%'";
        if (!string.IsNullOrEmpty(req.NoiDung))
            where += " AND NoiDung Like N'%' + @NoiDung + '%'";

        if (!string.IsNullOrEmpty(req.DuongDan))
            where += " AND DuongDan Like N'%' + @DuongDan + '%'";
        if (req.TuNgay.HasValue) where += $" AND ls.CreatedOn >= @TuNgay ";
        if (req.DenNgay.HasValue) where += $" AND ls.CreatedOn <= @DenNgay ";
        if (req.Removed == false)
            where += " AND api.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND api.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchLichSuApiChiaSeQueryHandler : IRequestHandler<SearchLichSuApiChiaSeQuery, PaginationResponse<LichSuApiChiaSeResponse>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLichSuApiChiaSeQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LichSuApiChiaSeResponse>> Handle(SearchLichSuApiChiaSeQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLichSuApiChiaSeQueryWhereBuilder.Build(request);
        var sql = $@"SELECT api.ID, IP, ls.CreatedOn
                     FROM [Portal].[APIChiaSes] api 
                     LEFT JOIN [Portal].[LichSuAPIChiaSes] ls on ls.ApiChiaSe = api.MaApiChiaSe
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LichSuApiChiaSeResponse>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}