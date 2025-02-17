using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoQuery : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? MaLinhVucChinh { get; set; }
    public string? ThuTucId { get; set; }
    public string? TiepNhanFrom { get; set; }
    public string? TinhThanhDiaBan { get; set; }
    public string? QuanHuyenDiaBan { get; set; }
    public string? XaPhuongDiaBan { get; set; }
    public string? TiepNhanTo { get; set; }
    public string? TieuChiThongKeHoSoTrongNgay { get; set; }
    public bool? CoNgayTiepNhan { get; set; }
    public string? LoaiLienThong { get; set; }
    public string? HenTraFrom { get; set; }
    public string? MaHoSoLienThong { get; set; }
    public string? SoKyHieuKetQua { get; set; }
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
    public string? NguoiDangXuLy { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? LyDoTuChoi { get; set; }
    public string? KenhThucHien { get; set; }
    public string? NguoiXuLyTruoc { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupCode2 { get; set; } // cái này cũng được dùng để lọc theo groupcode nhưng được dùng trong view theo dõi hồ sơ cho đơn vị
    public string? NotEqKenhThucHien { get; set; }
    public string? HinhThucTra { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? TenTTHC { get; set; }
    public string? MaTTHC { get; set; }
    public string? TrangThaiBoSung { get; set; }
    public string? HoSoTaiKhoan { get; set; }
    public bool? LaHoSoChungThuc { get; set; } = false;
    public bool? SearchAllType { get; set; } = false;
    public bool? NhanKetQuaBCCI { get; set; }
    public bool? DangKyQuaBuuDien { get; set; }
    public List<string>? NotInMaTrangThais { get; set; }
    public List<string>? InMaTrangThais { get; set; }
    public bool? ByCurrentUser { get; set; }
    public bool? ByNguoiNhanPhiDiaGioi { get; set; }
    public bool? LaNguoiNhanHoSo { get; set; }
    public bool? DangChoBanHanh { get; set; }
    public string? TrangThaiTraKq { get; set; }
    public string? DonViTraKq { get; set; }
    public string? TrangThaiPhiDiaGioi { get; set; }
    public string? KhongThuocTrangThaiPhiDiaGioi { get; set; }
    public DateTime? NopHoSoTuNgay { get; set; }
    public DateTime? NopHoSoDenNgay { get; set; }
    public DateTime? DangKyBuuDienTuNgay { get; set; }
    public DateTime? DangKyBuuDienDenNgay { get; set; }
    public DateTime? TraKqBuuDienTuNgay { get; set; }
    public DateTime? TraKqBuuDienDenNgay { get; set; }
    public int? SoGioLamViecTiepNhanMuon { get; set; }
    public bool? DaYeuCauBCCILayKetQua { get; set; }
    public bool? DangKyTraKQQuaBuuDien { get; set; }
    public bool? CanBoBCCIDaDangKy { get; set; }
    public string? TrangThaiTheoDoiHoSo { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public bool ? DaKySo { get; set; }
    public new int PageNumber { get; set; } = 1;
    public string? SearchKeys { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    public string? ChuHoSo { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? SoKyHieuTrichYeu { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? LoaiKetQua { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool HienThiTrangThaiThanhToan { get; set; } = true;
    public bool HienThiTrangThaiThanhToanBaoGomNgayThuPhi { get; set; } = false;
}
