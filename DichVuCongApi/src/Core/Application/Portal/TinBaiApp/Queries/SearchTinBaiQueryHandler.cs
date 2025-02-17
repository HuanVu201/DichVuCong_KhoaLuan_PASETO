using System.Linq;
using TD.DichVuCongApi.Application.Portal.KenhTinApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Queries;

public class SearchTinBaiQueryWhereBuilder
{
    public static string Build(SearchTinBaiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TieuDe))
            where += " AND TieuDe Like N'%' + @TieuDe + '%'";
        if (!string.IsNullOrEmpty(req.TrichYeu))
            where += " AND TrichYeu Like N'%' + @TrichYeu + '%'";
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

public class SearchTinBaiQueryHandler : IRequestHandler<SearchTinBaiQuery, PaginationResponse<TinBaiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTinBaiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<PaginationResponse<TinBaiDto>> Handle(SearchTinBaiQuery request, CancellationToken cancellationToken)
    {
        var where = SearchTinBaiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, TieuDe,TrichYeu,AnhDaiDien,NgayBanHanh FROM Portal.TinBais {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TinBaiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
