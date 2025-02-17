using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Queries;

public class SearchQuanLyLienKetQueryWhereBuilder
{
    public static string Build(SearchQuanLyLienKetQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma =  @Ma";
        if (req.SuDung == true)
            where += " AND SuDung LIKE '%' + @SuDung + '%'";
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
public class SearchQuanLyLienKetQueryHandler : IRequestHandler<SearchQuanLyLienKetQuery, PaginationResponse<QuanLyLienKetDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchQuanLyLienKetQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<QuanLyLienKetDto>> Handle(SearchQuanLyLienKetQuery request, CancellationToken cancellationToken)
    {
        var where = SearchQuanLyLienKetQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Ten,Ma,LinkLienKet,ThuTu, SuDung FROM Portal.QuanLyLienKets {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<QuanLyLienKetDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
