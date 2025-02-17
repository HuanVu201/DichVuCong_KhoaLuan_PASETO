using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;

public class SearchDonViThuTucPublicWhereBuilder
{
    public static string Build(SearchDonViThuTucPublicQuery req)
    {
        string where = "CoCau.Type = N'don-vi' AND CoCau.DeletedOn is null";
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND DonVi.MaTTHC = @MaTTHC";
        if (!string.IsNullOrEmpty(req.DonViId))
            where += " AND DonVi.DonViId = @DonViId";
        if (!string.IsNullOrEmpty(req.Catalog))
        {
            if (req.Catalog == "quan-huyen")
            {
                where += " AND (CoCau.Catalog = @Catalog OR CoCau.Catalog = 'cnvpdk')";
            }
            else
            {
                where += " AND CoCau.Catalog = @Catalog";
            }
        }

        if (!string.IsNullOrEmpty(req.OfGroupCode))
            where += " AND CoCau.OfGroupCode = @OfGroupCode";
        if (req.Removed == false)
            where += " AND DonVi.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DonVi.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchDonViThuTucPublicQueryHandler : IRequestHandler<SearchDonViThuTucPublicQuery, PaginationResponse<DonViThuTucPublicDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchDonViThuTucPublicQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<PaginationResponse<DonViThuTucPublicDto>> Handle(SearchDonViThuTucPublicQuery request, CancellationToken cancellationToken)
    {
        string where = SearchDonViThuTucPublicWhereBuilder.Build(request);

        string sql = $@"Select DonVi.Id as Id,DonVi.DonViId, CoCau.GroupName, CoCau.Catalog, DonVi.UrlRedirect, CoCau.OfGroupCode, CoCau.OfGroupName
                       from [Catalog].[DonViThuTucs] as DonVi
                       left Join [Catalog].[Groups] as CoCau on DonVi.DonViId = CoCau.GroupCode {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DonViThuTucPublicDto>(sql, request.PageSize, "DonViId", cancellationToken, request.PageNumber, request);
        return data;
    }
}
