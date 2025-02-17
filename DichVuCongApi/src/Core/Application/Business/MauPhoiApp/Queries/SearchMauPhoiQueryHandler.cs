using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;

public class SearchMauPhoiQueryWhereBuilder
{
    public static string Build(SearchMauPhoiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LoaiPhoi))
            where += " AND LoaiPhoi Like N'%' + @LoaiPhoi + '%'";
        if (!string.IsNullOrEmpty(req.Code))
            where += " AND Code Like N'%' + @Code + '%'";
        if (!string.IsNullOrEmpty(req.CustomerId))
            where += " AND CustomerId = @CustomerId";
        else
            where += " AND CustomerId is NULL";
        if (!string.IsNullOrEmpty(req.TenMauPhoi))
            where += " AND TenMauPhoi Like N'%' + @TenMauPhoi + '%'";
        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += " AND MaDonVi Like N'%' + @MaDonVi + '%'";
        if (!string.IsNullOrEmpty(req.MaLinhVuc))
            where += " AND MaLinhVuc Like N'%' + @MaLinhVuc + '%'";
        if (!string.IsNullOrEmpty(req.MaThuTuc))
            where += " AND MaThuTuc Like N'%' + @MaThuTuc + '%'";
        if (!string.IsNullOrEmpty(req.UrlMauPhoi))
            where += " AND UrlMauPhoi Like N'%' + @UrlMauPhoi + '%'";
        if (!string.IsNullOrEmpty(req.HtmlPhoi))
            where += " AND HtmlPhoi Like N'%' + @HtmlPhoi + '%'";
        if (req.LaPhoiEmail == true)
            where += " AND LaPhoiEmail = 1";
        else if (req.LaPhoiEmail == false)
            where += " AND LaPhoiEmail = 0";
        if (req.LaPhoiMacDinh == true)
            where += " AND LaPhoiMacDinh = 1";
        else if (req.LaPhoiMacDinh == false)
            where += " AND LaPhoiMacDinh = 0";
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

public class SearchMauPhoiQueryHandler : IRequestHandler<SearchMauPhoiQuery, PaginationResponse<MauPhoiDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchMauPhoiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<MauPhoiDto>> Handle(SearchMauPhoiQuery request, CancellationToken cancellationToken)
    {
        string where = SearchMauPhoiQueryWhereBuilder.Build(request);
        string sql = $@"SELECT ID, LoaiPhoi, Code, TenMauPhoi, MaDonVi, MaLinhVuc, MaThuTuc, UrlMauPhoi, HtmlPhoi, LaPhoiEmail, LaPhoiMacDinh, CustomerId, CreatedOn FROM Business.MauPhois {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<MauPhoiDto>(sql, request.PageSize, "CreatedOn ASC", cancellationToken, request.PageNumber, request);
        return data;
    }
}