using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Portal.BannerApp.Queries;


public class SearchBannerQuery : PaginationFilter, IRequest<PaginationResponse<BannerDto>>
{
    public string? ImageUrl { get; set; }
    public bool? SuDung { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
