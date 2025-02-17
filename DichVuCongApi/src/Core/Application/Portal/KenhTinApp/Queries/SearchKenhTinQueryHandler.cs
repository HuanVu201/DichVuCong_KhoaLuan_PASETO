using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Specification;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Queries;

public class SearchKenhTinQueryWhereBuilder
{
    public static string Build(SearchKenhTinQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenKenhTin))
            where += " AND TenKenhTin Like N'%' + @TenKenhTin + '%'";
        if (!string.IsNullOrEmpty(req.TomTat))
            where += " AND TomTat Like N'%' + @TomTat + '%'";
        if (!string.IsNullOrEmpty(req.KieuNoiDungId))
            where += " AND KieuNoiDungId Like N'%' + @KieuNoiDungId + '%'";
        if (req.Removed == false)
            where += " AND kt.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND kt.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchKenhTinQueryHandler : IRequestHandler<SearchKenhTinQuery, PaginationResponse<KenhTinDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchKenhTinQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<PaginationResponse<KenhTinDto>> Handle(SearchKenhTinQuery request, CancellationToken cancellationToken)
    {
        var where = SearchKenhTinQueryWhereBuilder.Build(request);
        var sql = $@"SELECT kt.ID,kt.TenKenhTin,kt.ImageUrl,kt.LoaiMoLienKet,kt.LienKetNgoai,kt.HienThiMenuChinh,kt.NoiDung,kt.HienThiMenuDoc,kt.HienThiMenuPhu, kt.ThuTu, kt.TomTat,kt.MaKenhTinCha,kn.TenNoiDung
                     FROM Portal.KenhTins kt
                     INNER JOIN Portal.KieuNoiDungs kn ON kt.KieuNoiDungId = kn.ID {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KenhTinDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
