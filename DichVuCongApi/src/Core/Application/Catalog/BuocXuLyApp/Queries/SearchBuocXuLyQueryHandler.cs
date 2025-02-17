using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.MenuApp;
using TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Queries;

public class SearchBuocXuLyQueryWhereBuilder
{
    public static string Build(SearchBuocXuLyQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenBuoc))
            where += " AND TenBuoc Like N'%' + @TenBuoc + '%'";
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
public class SearchBuocXuLyQueryHandler : IRequestHandler<SearchBuocXuLyQuery, PaginationResponse<BuocXuLyDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchBuocXuLyQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<BuocXuLyDto>> Handle(SearchBuocXuLyQuery request, CancellationToken cancellationToken)
    {
        var where = SearchBuocXuLyQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID,TenBuoc FROM Catalog.BuocXuLys {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<BuocXuLyDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
