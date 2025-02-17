using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;
using TD.DichVuCongApi.Application.Portal.TrangThaiApp;
using TD.DichVuCongApi.Application.Portal.TrangThaiApp.Queries;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.LGSP.PortalApi.Application.Catalog.TrangThaiApp.Queries;

public class SearchTrangThaiQueryWhereBuilder
{
    public static string Build(SearchTrangThaiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenTrangThai))
            where += " AND TenTrangThai Like N'%' + @TenTrangThai + '%'";
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

public class SearchTrangThaiQueryHandler : IRequestHandler<SearchTrangThaiQuery, PaginationResponse<TrangThaiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;


    public SearchTrangThaiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<PaginationResponse<TrangThaiDto>> Handle(SearchTrangThaiQuery request, CancellationToken cancellationToken)
    {
        var where = SearchTrangThaiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, TenTrangThai FROM Portal.TrangThais {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TrangThaiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
