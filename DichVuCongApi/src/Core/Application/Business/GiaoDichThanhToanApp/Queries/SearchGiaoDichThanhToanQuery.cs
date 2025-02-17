using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;


public class SearchGiaoDichThanhToanQuery : PaginationFilter, IRequest<PaginationResponse<GiaoDichThanhToanDto>>
{
    public string? MaDonVi { get; set; }
    public string? HoSo { get; set; }
    public string? MaThuTucDVCQG { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? TrangThai { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get;set; }
    public bool? AutoChecked { get; set; } 
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
