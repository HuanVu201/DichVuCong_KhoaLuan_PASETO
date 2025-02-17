using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;


public class SearchHoSoTheoBaoCaoTTTTQuery : PaginationFilter, IRequest<PaginationResponse<YeuCauThanhToanDto>>
{
    public string? HoSoId { get; set; }
    public string? MaHoSo { get; set; }
    public string? TrangThai { get; set; }
    public string? HinhThucThu { get; set; }
    public string? HinhThucThanhToan { get; set; }
    public bool LaDuLieuThongKeCacNam { get; set; }
    public bool? LaNguoiTiepNhan { get; set; }
    public string? DonViThu { get; set; }
    public string? DonVi { get; set; }
    public string? NguoiGui { get; set; }
    public string? ChuHoSo { get; set; }
    public string? TuKhoa { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? MaTTHC { get; set; }
    public string? Catalog { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public DateTime? TiepNhanTuNgay {  get; set; }
    public DateTime? TiepNhanDenNgay { get; set; }
    public DateTime? ThanhToanTuNgay { get; set; }
    public DateTime? ThanhToanDenNgay { get; set; }
    public string? KenhThucHien { get; set; }
    public string? TieuChi { get; set; }
 
   [JsonIgnore]
    public Guid? NguoiTiepNhan { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public List<string>? MucDos { get; set; } = new List<string>();
}
