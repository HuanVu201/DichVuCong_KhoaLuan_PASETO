using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Queries;


public class SearchDSTaiLieuHDSDQuery : PaginationFilter, IRequest<PaginationResponse<DSTaiLieuHDSDDto>>
{
    public string? TenTaiLieu { get; set; }
    public string? TaiLieuDanhcho { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
