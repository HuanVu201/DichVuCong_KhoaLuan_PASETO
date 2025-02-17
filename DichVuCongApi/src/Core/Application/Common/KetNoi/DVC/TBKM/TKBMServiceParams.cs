
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
public class AddTKBMRequestParams
{
    public string MaHoSo { get; set; }
    public string MaTTHC { get; set; }
    public string SoVanBan { get; set; }
    public string NgayNopHoSo { get; set; }
    public string TenThuongNhan { get; set; }
    public DiaChiDoanhNghiepThongBaoThucHienKhuyenMai DiaChiDoanhNghiep { get; set; }
    public string DienThoai { get; set; }
    public string Fax { get; set; }
    public string Email { get; set; }
    public string MaSoThue { get; set; }
    public string NguoiLienHe { get; set; }
    public string SoDienThoaiNguoiLienHe { get; set; }
    public string TenChuongTrinhKhuyenMai { get; set; }
    public string HinhThucKhuyenMai { get; set; }
    public string ThoiGianKhuyenMaiTu { get; set; }
    public string ThoiGianKhuyenMaiDen { get; set; }
    public string HangHoaDichVuKhuyenMai { get; set; }
    public string SoLuongHangHoaDichVu { get; set; }
    public string KhachHang { get; set; }
    public string CoCauGiaiThuong { get; set; }
    public string TongGiaTriHangHoa { get; set; }
    public string NoiDungChiTiet { get; set; }
    public string TenCacThuongNhanCungThucHien { get; set; }
    public string TenTepDonDangKy { get; set; }
    public string TepDonDangKy { get; set; }
    public List<TaiLieuNopHoSoThongBaoThucHienKhuyenMai> TaiLieuNop { get; set; }
}

public class TaiLieuNopHoSoThongBaoThucHienKhuyenMai
{
    public string TenTepDinhKem { get; set; }
    public string Base64 { get; set; }
}
public class DiaChiDoanhNghiepThongBaoThucHienKhuyenMai
{
    public string MaTinh { get; set; }
    public string MaHuyen { get; set; }
    public string MaXa { get; set; }
    public string DiaChiChiTiet { get; set; }
}



public class AddBSTBKMRequestParams
{
    public string service { get; set; }
    public string isUpdating { get; set; }
    public HoSoThongBaoThucHienKhuyenMaiBoSung data { get; set; }
}
public class HoSoThongBaoThucHienKhuyenMaiBoSung
{
    public string MaHoSoQG { get; set; }
    public string MaTTHC { get; set; }
    public string SoVanBan { get; set; }
    public string NgayNopHoSo { get; set; }
    public string TenThuongNhan { get; set; }
    public DiaChiDoanhNghiepThongBaoThucHienKhuyenMai DiaChiDoanhNghiep { get; set; }
    public string DienThoai { get; set; }
    public string Fax { get; set; }
    public string Email { get; set; }
    public string MaSoThue { get; set; }
    public string NguoiLienHe { get; set; }
    public string SoDienThoaiNguoiLienHe { get; set; }
    public ThongTinDaNop ThongTinDaNop { get; set; }
    public ThongTinSuaDoi ThongTinSuaDoi { get; set; }
    public string LyDoDieuChinh { get; set; }
    public string NoiDungCamKetKhac { get; set; }
    public string TenTepDangKy { get; set; }
    public string URLTepDangKy { get; set; }
}

public class ThongTinDaNop
{
    public string MaHoSoQGDNP { get; set; }
    public string SoVanBanDaNopDNP { get; set; }
    public string NgayNopHoSoDNP { get; set; }
    public string TenChuongTrinhKhuyenMaiDNP { get; set; }
    public string ThoiGianKhuyenMaiTuDNP { get; set; }
    public string ThoiGianKhuyenMaiDenDNP { get; set; }
    public string DiaBanKhuyenMaiDNP { get; set; }
}

public class ThongTinSuaDoi
{
    public string? SoLuongHangHoaDichVuKM { get; set; }
    public string? HangHoaDichVuKM { get; set; }
    public string? CoCauGiaiThuongKM { get; set; }
    public string? NoiDungChiTietKM { get; set; }
    public string? HangHoaDichVuDungKM { get; set; }
}

public class DongBoTBKMRequest
{
    public string TrangThai { get; set; }
    public string MaHoSo { get; set; }
    public string MaHoSoDonVi { get; set; }
    public string MaDoiTuong { get; set; }
    public string NoiDung { get; set; }
    public string NgayXuLy { get; set; }
    public List<TaiLieuKetQuaThongBaoThucHienKhuyenMai> TaiLieuXuLy { get; set; }
    public string ToJson()
    {
        return JsonConvert.SerializeObject(this);
    }
}

public class TaiLieuKetQuaThongBaoThucHienKhuyenMai
{
    public int? TepDinhKemId { get; set; }
    public string TenTepDinhKem { get; set; }
    public string IsDeleted { get; set; }
    public string MaThanhPhanHoSo { get; set; }
    public string DuongDanTaiTepTin { get; set; }
}

public class BoDyKetQuaThongBaoThucHienKhuyenMai
{
    public string session { get; set; }
    public string madonvi { get; set; }
    public string service { get; set; }
    public string type { get; set; }
    public KetQuaThongBaoThucHienKhuyenMai data { get; set; }
    public string ToJson()
    {
        return JsonConvert.SerializeObject(this);
    }
}

public class KetQuaThongBaoThucHienKhuyenMai
{
    public string TrangThai { get; set; }
    public string MaHoSo { get; set; }
    public string MaHoSoDonVi { get; set; }
    public string MaDoiTuong { get; set; }
    public string NoiDung { get; set; }
    public string NgayXuLy { get; set; }
    public List<TaiLieuKetQuaThongBaoThucHienKhuyenMai> TaiLieuXuLy { get; set; }
    public string ToJson()
    {
        return JsonConvert.SerializeObject(this);
    }
}