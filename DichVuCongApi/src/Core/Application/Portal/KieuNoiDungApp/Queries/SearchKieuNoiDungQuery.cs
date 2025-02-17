
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;
public class SearchKieuNoiDungQuery : PaginationFilter, IRequest<PaginationResponse<KieuNoiDungBaseDto>>
{
    public bool? Removed { get; set; } = false;
    public string? TenNoiDung { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;

}
