using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Queries;

public class SearchLoaiPhiLePhiQueryWhereBuilder
{
    public static string Build(SearchLoaiPhiLePhi req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
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
public class SearchLoaiPhiLePhiQueryHandler : IRequestHandler<SearchLoaiPhiLePhi, PaginationResponse<LoaiPhiLePhiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLoaiPhiLePhiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LoaiPhiLePhiDto>> Handle(SearchLoaiPhiLePhi request, CancellationToken cancellationToken)
    {
        var where = SearchLoaiPhiLePhiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Ten, Ma, SuDung FROM Business.LoaiPhiLePhis {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LoaiPhiLePhiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
