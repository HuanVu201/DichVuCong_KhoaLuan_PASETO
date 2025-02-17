using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Queries;

public class SearchFooterQueryWhereBuilder
{
    public static string Build(SearchFooterQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TieuDe))
            where += " AND TieuDe Like N'%' + @TieuDe + '%'";
        if (!string.IsNullOrEmpty(req.NoiDung))
            where += " AND NoiDung Like N'%' + @NoiDung + '%'";
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
public class SearchFooterQueryHandler : IRequestHandler<SearchFooterQuery, PaginationResponse<FooterDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchFooterQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<FooterDto>> Handle(SearchFooterQuery request, CancellationToken cancellationToken)
    {
        var where = SearchFooterQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, TieuDe, NoiDung, ImageUrl FROM Portal.Footers {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<FooterDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
