using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Queries;
using TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Queries;

public class SearchChuKySoCaNhanQueryWhereBuilder
{
    public static string Build(SearchChuKySoCaNhanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND UserName Like N'%' + @UserName + '%'";
       
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
public class SearchChuKySoCaNhanQueryHandler : IRequestHandler<SearchChuKySoCaNhanQuery, PaginationResponse<ChuKySoCaNhanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchChuKySoCaNhanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ChuKySoCaNhanDto>> Handle(SearchChuKySoCaNhanQuery request, CancellationToken cancellationToken)
    {
        var where = SearchChuKySoCaNhanQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, UserName, HinhAnh, MoTa, CreatedOn as ThoiGianTao, LastModifiedOn as ThoiGianThayDoi FROM Business.ChuKySoCaNhans {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ChuKySoCaNhanDto>(sql, request.PageSize, "Id", cancellationToken, request.PageNumber, request);
        return data;
    }
}
