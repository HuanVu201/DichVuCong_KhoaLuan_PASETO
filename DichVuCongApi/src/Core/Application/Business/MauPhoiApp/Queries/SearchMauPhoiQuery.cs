using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;

public class SearchMauPhoiQuery : PaginationFilter, IRequest<PaginationResponse<MauPhoiDto>>
{
    public string? LoaiPhoi { get; set; }
    public string? Code { get; set; }
    public string? TenMauPhoi { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? MaThuTuc { get; set; }
    public string? UrlMauPhoi { get; set; }
    public string? HtmlPhoi { get; set; }
    public bool? LaPhoiEmail { get; set; }
    public bool? LaPhoiMacDinh { get; set; }
    public string? CustomerId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
