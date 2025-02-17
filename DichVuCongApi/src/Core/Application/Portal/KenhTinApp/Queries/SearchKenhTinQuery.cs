
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Queries;
public class SearchKenhTinQuery : PaginationFilter, IRequest<PaginationResponse<KenhTinDto>>
{
    public string? TenKenhTin { get; set; }
    public Nullable<Guid> MaKenhTinCha { get; set; }
    public string? TomTat { get; set; }
    public bool? Removed { get; set; } = false;
    public string? KieuNoiDungId { get; set; }
    //public bool? HienThiMenuChinh { get; set; }
    //public bool? HienThiMenuDoc { get; set; }
    //public bool? HienThiMenuPhu { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
