using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.MenuApp;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Queries;


public class SearchNgayNghiQuery : PaginationFilter, IRequest<PaginationResponse<NgayNghiDto>>
{
    public DateTime? Date { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
