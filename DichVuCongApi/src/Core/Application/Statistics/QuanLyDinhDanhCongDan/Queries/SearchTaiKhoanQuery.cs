using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

public class SearchTaiKhoanQuery : PaginationFilter, IRequest<PaginationResponse<UserAppDto>>
{
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public bool? DaDinhDanh { get; set; }
    public string? TypeUser { get; set; }
    public string? DoTuoi { get; set; }
    public string? GioiTinh { get; set; }
    public string? DoiTuong { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}