using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.BannerApp.Queries;

public class SearchBannerQueryWhereBuilder
{
    public static string Build(SearchBannerQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.ImageUrl))
            where += " AND ImageUrl Like N'%' + @ImageUrl + '%'";
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
public class SearchBannerQueryHandler : IRequestHandler<SearchBannerQuery, PaginationResponse<BannerDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchBannerQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<BannerDto>> Handle(SearchBannerQuery request, CancellationToken cancellationToken)
    {
        var where = SearchBannerQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, ImageUrl, SuDung FROM Portal.Banners {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<BannerDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
