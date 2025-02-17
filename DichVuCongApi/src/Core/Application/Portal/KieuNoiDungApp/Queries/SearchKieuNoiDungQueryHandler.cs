using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Portal.BannerApp;
using TD.DichVuCongApi.Application.Portal.BannerApp.Queries;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;

public class SearchKieuNoiDungQueryWhereBuilder
{
    public static string Build(SearchKieuNoiDungQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenNoiDung))
            where += " AND TenNoiDung Like N'%' + @TenNoiDung + '%'";
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

public class SearchKieuNoiDungQueryHandler : IRequestHandler<SearchKieuNoiDungQuery, PaginationResponse<KieuNoiDungBaseDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;

    public SearchKieuNoiDungQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<PaginationResponse<KieuNoiDungBaseDto>> Handle(SearchKieuNoiDungQuery request, CancellationToken cancellationToken)
    {
        var where = SearchKieuNoiDungQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, TenNoiDung, ChoPhepNhapNoiDung, ChoPhepNhapLoaiLienKet, ChoPhepThemTinBai FROM Portal.KieuNoiDungs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KieuNoiDungBaseDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
