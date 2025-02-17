using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Queries;
public class SearchTrangThaiQuery : PaginationFilter, IRequest<PaginationResponse<TrangThaiDto>>
{
    public string? TenTrangThai { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
