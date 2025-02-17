using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Queries;


public class SearchFooterQuery : PaginationFilter, IRequest<PaginationResponse<FooterDto>>
{
    public string? TieuDe { get; set; }
    public string? NoiDung { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
