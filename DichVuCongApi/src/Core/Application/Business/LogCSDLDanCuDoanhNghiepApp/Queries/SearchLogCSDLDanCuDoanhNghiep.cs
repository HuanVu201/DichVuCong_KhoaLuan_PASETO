using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;

public class SearchLogCSDLDanCuDoanhNghiep : PaginationFilter, IRequest<PaginationResponse<LogCSDLDanCuDoanhNghiepDto>>
{
    public string? Loai { get; set; }
    public string? TaiKhoan { get; set; }
    public DateTime? ThoiGian { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? DonViId { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
