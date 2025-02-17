using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Queries;


public class SearchQuanLyVanBanQuery : PaginationFilter, IRequest<PaginationResponse<QuanLyVanBanDto>>
{
    public string? MaLinhVuc { get; set; }
    public bool? CongKhai { get; set; }
    public string? LoaiVanBan { get; set; }
    public string? TrichYeu { get; set; }
    public string? TuKhoa { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 50;
    public new int PageNumber { get; set; } = 1;
}
