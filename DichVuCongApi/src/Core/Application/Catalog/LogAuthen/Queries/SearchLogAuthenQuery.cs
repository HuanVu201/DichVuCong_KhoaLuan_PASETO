using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.LogAuthen;

namespace TD.DichVuCongApi.Catalog.Catalog.LogAuthen.Queries;

public class SearchLogAuthenQuery : PaginationFilter, IRequest<PaginationResponse<LogAuthenDto>>
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? IP { get; set; }
    public string? TypeUser { get; set; }
    public string? TypeLogin { get; set; }
    public string? Device { get; set; }
    [JsonIgnore]
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
