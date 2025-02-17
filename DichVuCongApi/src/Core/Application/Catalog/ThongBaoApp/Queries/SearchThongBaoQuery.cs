using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.ThongBaoApp;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Queries;


public class SearchThongBaoQuery : PaginationFilter, IRequest<PaginationResponse<ThongBaoDto>>
{
    public Guid? DonViId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
