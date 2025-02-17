
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Queries;
public class SearchTinBaiQuery : PaginationFilter, IRequest<PaginationResponse<TinBaiDto>>
{
    public string? TieuDe { get; set; }
    public DateTime? FromNgayBanHanh { get; set; }
    public DateTime? ToNgayBanHanh { get; set; }
    public DateTime? FromNgayKetThuc { get; set; }
    public DateTime? ToNgayKetThuc { get; set; }
    public string? TrichYeu { get; set; }
    public Guid? KenhTinId { get; set; }
    public Guid? TrangThaiId { get; set; }
    public bool? DaXuatBan { get; set; }
    public bool? TinNoiBat { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
