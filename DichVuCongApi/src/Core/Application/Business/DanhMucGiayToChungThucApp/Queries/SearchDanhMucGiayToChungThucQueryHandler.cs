using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.DanhMucGiayToChungThucApp.Dtos;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Queries;

public class SearchDanhMucGiayToChungThucQueryWhereBuilder
{
    public static string Build(SearchDanhMucGiayToChungThucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
        if (req.SuDung == true || req.SuDung == null)
            where += " AND SuDung = 1";
        else if(req.SuDung == false)
            where += " AND SuDung = 0";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchDanhMucGiayToChungThucQueryHandler : IRequestHandler<SearchDanhMucGiayToChungThucQuery, PaginationResponse<DanhMucGiayToChungThucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchDanhMucGiayToChungThucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DanhMucGiayToChungThucDto>> Handle(SearchDanhMucGiayToChungThucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDanhMucGiayToChungThucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, SuDung, Ten, Ma FROM Business.DanhMucGiayToChungThucs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhMucGiayToChungThucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
