using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.MenuApp;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Queries;

public class SearchNgayNghiQueryWhereBuilder
{
    public static string Build(SearchNgayNghiQuery req)
    {
        string where = string.Empty;
        if (req.Date != null)
            where += " AND Date Like N'%' + @Date + '%'";
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
public class SearchNgayNghiQueryHandler : IRequestHandler<SearchNgayNghiQuery, PaginationResponse<NgayNghiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchNgayNghiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<NgayNghiDto>> Handle(SearchNgayNghiQuery request, CancellationToken cancellationToken)
    {
        var where = SearchNgayNghiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Date, Description FROM Catalog.NgayNghis {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<NgayNghiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
