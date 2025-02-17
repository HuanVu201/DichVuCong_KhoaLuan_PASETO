using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Queries;

public class SearchCauHoiPhoBienQueryWhereBuilder
{
    public static string Build(SearchCauHoiPhoBienQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.NoiDungCauHoi))
            where += " AND NoiDungCauHoi Like N'%' + @NoiDungCauHoi + '%'";
        if (!string.IsNullOrEmpty(req.TieuDe))
            where += " AND TieuDe Like N'%' + @TieuDe + '%'";
        if (!string.IsNullOrEmpty(req.Id))
            where += " AND Id = @Id";
        if (!string.IsNullOrEmpty(req.Type))
            where += " AND Type Like N'%' + @Type + '%'";
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
public class SearchCauHoiPhoBienQueryHandler : IRequestHandler<SearchCauHoiPhoBienQuery, PaginationResponse<CauHoiPhoBienDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchCauHoiPhoBienQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<CauHoiPhoBienDto>> Handle(SearchCauHoiPhoBienQuery request, CancellationToken cancellationToken)
    {
        var where = SearchCauHoiPhoBienQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, TieuDe,Type ,NoiDungCauHoi, NoiDungTraLoi FROM Portal.CauHoiPhoBiens {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<CauHoiPhoBienDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
