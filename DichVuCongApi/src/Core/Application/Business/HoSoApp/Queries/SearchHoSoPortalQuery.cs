using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoPortalQuery : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? MaLinhVucChinh { get; set; }
    public string? TiepNhanFrom { get; set; }
    public string? TinhThanhDiaBan { get; set; }
    public string? QuanHuyenDiaBan { get; set; }
    public string? XaPhuongDiaBan { get; set; }
    public string? TiepNhanTo { get; set; }
    public string? HenTraFrom { get; set; }
    public string? HoSoToiHan { get; set; }
    public string? HenTraTo { get; set; }
    public string? NgayTraFrom { get; set; }
    public string? NgayTraTo { get; set; }
    public string? ViewHoSo { get; set; }
    public string? MaTrangThai { get; set; }
    public string? MaTruongHop { get; set; }
    public string? MaHoSo { get; set; }
    public string? TrangThaiThuPhi { get; set; }
    public string? NguoiDaXuLy { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? LyDoTuChoi { get; set; }
    public string? KenhThucHien { get; set; }
    public string? NguoiXuLyTruoc { get; set; }
    public string? GroupCode { get; set; }
    public string? NotEqKenhThucHien { get; set; }
    public string? HinhThucTra { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? TenTTHC { get; set; }
    public string? MaTTHC { get; set; }
    public string? TrangThaiBoSung { get; set; }
    public bool? ByNguoiGui { get; set; }
    public bool? LaHoSoChungThuc { get; set; } = false;
    public bool? SearchAllType { get; set; } = false;
    public bool? NhanKetQuaBCCI { get; set; }
    public bool? DangKyQuaBuuDien { get; set; }
    public List<string>? NotInMaTrangThais { get; set; }
    public List<string>? InMaTrangThais { get; set; }
    public bool? ByCurrentUser { get; set; }
    public bool? LaNguoiNhanHoSo { get; set; }
    public string? TrangThaiTraKq { get; set; }
    public string? DonViTraKq { get; set; }
    public DateTime? NopHoSoTuNgay { get; set; }
    public DateTime? NopHoSoDenNgay { get; set; }
    public DateTime? DangKyBuuDienTuNgay { get; set; }
    public DateTime? DangKyBuuDienDenNgay { get; set; }
    public DateTime? TraKqBuuDienTuNgay { get; set; }
    public DateTime? TraKqBuuDienDenNgay { get; set; }
    public int? SoGioLamViecTiepNhanMuon { get; set; }
    public bool? DaYeuCauBCCILayKetQua { get; set; }
    public bool? CanBoBCCIDaDangKy { get; set; }
    public string? TrangThaiTheoDoiHoSo { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public string? SearchKeys { get; set; }
    public string? SoKyHieuTrichYeu { get; set; }
}
