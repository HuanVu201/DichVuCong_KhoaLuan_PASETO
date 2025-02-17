namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
public class SearchDonViThuTucPublicQuery : IRequest<PaginationResponse<DonViThuTucPublicDto>>
{
    public string? MaTTHC { get; set; }
    public string? Catalog { get; set; }
    public string? OfGroupCode { get; set; }
    public string? DonViId { get; set; }
    [Newtonsoft.Json.JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public bool? Removed { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

public class DonViThuTucPublicDto : IDto
{
    public string DonViId { get; set; }
    public string Catalog { get; set; }
    public string GroupName { get; set; }
    public string OfGroupCode { get; set; }
    public string OfGroupName { get; set; }
    public string UrlRedirect { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public int TotalCount { get; set; }
}