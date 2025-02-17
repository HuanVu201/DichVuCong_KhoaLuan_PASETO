using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Queries;
public class SearchThuTucThietYeuQueryWhereBuilder
{
    public static string Build(SearchThuTucThietYeuQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND MaTTHC Like N'%' + @MaTTHC + '%'";
        if (!string.IsNullOrEmpty(req.TenTTHC))
            where += " AND TenTTHC Like N'%' + @TenTTHC + '%'";
        if (!string.IsNullOrEmpty(req.LinkDVC))
            where += " AND LinkDVC Like N'%' + @LinkDVC + '%'";

        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchThuTucThietYeuQueryHandler : IRequestHandler<SearchThuTucThietYeuQuery, PaginationResponse<ThuTucThietYeuDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThuTucThietYeuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThuTucThietYeuDto>> Handle(SearchThuTucThietYeuQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThuTucThietYeuQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, MaTTHC, TenTTHC, LinkDVC, SoThuTu FROM Catalog.ThuTucThietYeus {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucThietYeuDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}