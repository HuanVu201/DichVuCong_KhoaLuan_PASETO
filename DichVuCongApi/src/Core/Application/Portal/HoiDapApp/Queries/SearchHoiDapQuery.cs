using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Queries;


public class SearchHoiDapQuery : PaginationFilter, IRequest<PaginationResponse<HoiDapDto>>
{
    public string? MaDonVi { get; set; }
    public string? NoiDung { get; set; }
    public string? CongKhai { get; set; }
    public string? TrangThai { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
