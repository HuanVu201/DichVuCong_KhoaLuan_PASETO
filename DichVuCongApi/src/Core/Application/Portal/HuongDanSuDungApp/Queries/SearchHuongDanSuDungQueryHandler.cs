using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Queries;

public class SearchHuongDanSuDungQueryWhereBuilder
{
    public static string Build(SearchHuongDanSuDungQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.NoiDungHuongDanSuDung))
            where += " AND NoiDungHuongDanSuDung Like N'%' + @NoiDungHuongDanSuDung + '%'";
        if (!string.IsNullOrEmpty(req.TenHuongDanSuDung))
            where += " AND TenHuongDanSuDung Like N'%' + @TenHuongDanSuDung + '%'";
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
public class SearchHuongDanSuDungQueryHandler : IRequestHandler<SearchHuongDanSuDungQuery, PaginationResponse<HuongDanSuDungDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchHuongDanSuDungQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<HuongDanSuDungDto>> Handle(SearchHuongDanSuDungQuery request, CancellationToken cancellationToken)
    {
        var where = SearchHuongDanSuDungQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, TenHuongDanSuDung,ThuTu,NoiDungHuongDanSuDung FROM Portal.HuongDanSuDungs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HuongDanSuDungDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
