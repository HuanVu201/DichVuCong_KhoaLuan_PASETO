using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Queries;

public class SearchQuyTrinhXuLyQueryWhereBuilder
{
    public static string Build(SearchQuyTrinhXuLyQuery req)
    {
        string where = string.Empty;
        if (req.TruongHopId != null && req.TruongHopId != default)
            where += " AND TruongHopId = @TruongHopId";
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
public class SearchQuyTrinhXuLyQueryHandler : IRequestHandler<SearchQuyTrinhXuLyQuery, PaginationResponse<QuyTrinhXuLyDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchQuyTrinhXuLyQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<QuyTrinhXuLyDto>> Handle(SearchQuyTrinhXuLyQuery request, CancellationToken cancellationToken)
    {
        var where = SearchQuyTrinhXuLyQueryWhereBuilder.Build(request);
        var sql = $@"SELECT *     
        FROM Business.QuyTrinhXuLys {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<QuyTrinhXuLyDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
