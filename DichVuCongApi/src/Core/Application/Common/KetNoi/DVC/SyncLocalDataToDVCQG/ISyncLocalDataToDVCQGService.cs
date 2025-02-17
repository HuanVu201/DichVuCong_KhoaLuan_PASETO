using TD.DichVuCongApi.Application.Business.HoSoApp;

namespace TD.DichVuCongApi.Application.Common.KetNoi.DVC.SyncLocalDataToDVCQG;
public interface ISyncLocalDataToDVCQGService : ITransientService
{
    Task<object> SyncData(string ngayTiepNhanFrom, string ngayTiepNhanTo);
    SyncDataToDVCQG.FormatDataDVC FormatData(SyncDataToDVCQG.HoSoDto hoSoDto);
    Task<string> PushData(SyncDataToDVCQG.HoSoDto hoSoDto);
    Task<Result<string>> PushDataByMaHoSo(string maHoSo);
    Task<object> GetDataDB(SyncDataToDVCQG.NgayTiepNhanDongBoDVCQG req);
    Task<Result> CapNhatChuaDongBoMaHoSoLois(IReadOnlyList<string> maHoSos);
}

public static class SyncDataToDVCQG
{
    public class CapNhatChuaDongBoDVCQG
    {
        public IReadOnlyList<string> MaHoSos { get; set; }
    }
    public class NgayTiepNhanDongBoDVCQG
    {
        public string? ngayTiepNhanFrom { get; set; }
        public string? ngayTiepNhanTo { get; set; }
        public string? maHoSo { get; set; }
    }
    public class FormatDataDVC
    {
        public SyncDataToDVCQG.HoSoDongBoDVC hoSo { get; set; }
        public List<SyncDataToDVCQG.QuaTrinhXuLyDongBoDVC> tienTrinhDongBo { get; set; }
    }
    public class ResultHoSoDongBoDVCQuocGia
    {
        public string error_code { get; set; }
        public string message { get; set; }
    }
    public class HoSoDongBoDVC
    {
        public string MaHoSo { get; set; }
        public string MaTTHC { get; set; }
        public string TenTTHC { get; set; }
        public string MaLinhVuc { get; set; }
        public string TenLinhVuc { get; set; }
        public string? KenhThucHien { get; set; }
        public string SoGiayToChuHoSo { get; set; }
        public string? ChuHoSo { get; set; } 
        public string LoaiDoiTuong { get; set; }
        public string MaDoiTuong { get; set; }
        public string? ThongTinKhac { get; set; } = "";
        public string? Email { get; set; } = "";
        public string? Fax { get; set; } = "";
        public string? SoDienThoai { get; set; }
        public string? TrichYeuHoSo { get; set; }
        public string NgayTiepNhan { get; set; }
        public string? NgayHenTra { get; set; } = "";
        public string TrangThaiHoSo { get; set; }
        public string? NgayTra { get; set; } = "";
        public string? ThongTinTra { get; set; }
        public string HinhThuc { get; set; }
        public string? NgayKetThucXuLy { get; set; } = "";
        public string DonViXuLy { get; set; }
        public string? GhiChu { get; set; } = "";
        public List<TaiLieuNopDongBoDVC>? TaiLieuNop { get; set; }
        public List<LePhiDongBoDVC>? DanhSachLePhi { get; set; }
        public List<TepDinhKemKhac>? DanhSachTepDinhKemKhac { get; set; }
        public List<HoSoBoSung>? DanhSachHoSoBoSung { get; set; }
        public List<GiayToKetQua>? DanhSachGiayToKetQua { get; set; }
        public string NoiNopHoSo { get; set; }
        public string HoSoCoThanhPhanSoHoa { get; set; }
        public string TaiKhoanDuocXacThucVoiVNeID { get; set; }
        public string DuocThanhToanTrucTuyen { get; set; }
        public string? NgayTuChoi { get; set; }
        public List<DinhDanhCHS> DinhDanhCHS { get; set; }
        public string NgayNopHoSo { get; set; }
        public List<DSKetNoiCSDL> DSKetNoiCSDL { get; set; }
    }
    public class TaiLieuNopDongBoDVC
    {
        public string? TepDinhKemId { get; set; } = "";
        public string TenTepDinhKem { get; set; }
        public string? IsDeleted { get; set; }
        public string MaThanhPhanHoSo { get; set; }
        public string DuongDanTaiTepTin { get; set; }
        public string DuocSoHoa { get; set; }
        public string DuocTaiSuDung { get; set; }
        public string DuocLayTuKhoDMQG { get; set; } = "1";
        public string? MaKetQuaThayThe { get; set; }
    }
    public class QuaTrinhXuLyDongBoDVC
    {
        public string MaHoSo { get; set; }
        public string NguoiXuLy { get; set; }
        public string ChucDanh { get; set; } = "";
        public string ThoiDiemXuLy { get; set; }
        public string? PhongBanXuLy { get; set; } = "";
        public string? NoiDungXuLy { get; set; } = "";
        public string TrangThai { get; set; }
        public string? NgayBatDau { get; set; } = "";
        public string? NgayKetThucTheoQuyDinh { get; set; } = "";
    }
    public class LePhiDongBoDVC
    {
        public string TenPhiLePhi { get; set; }
        public string MaPhiLePhi { get; set; }
        public string HinhThucThu { get; set; }
        public string Gia { get; set; }
        public string LoaiPhiLePhi { get; set; }
    }
    public class HoSoDto
    {
        public HoSoDto()
        {
            QuaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
            TaiLieuNop = new List<TepDinhKem>();
            DanhSachLePhi = new List<LePhi>();
            DanhSachTepDinhKemKhac = new List<TepDinhKemKhac>();
            DanhSachHoSoBoSung = new List<HoSoBoSung>();
            DanhSachGiayToKetQua = new List<GiayToKetQua>();
            DinhDanhCHS = new List<DinhDanhCHS>();
            DSKetNoiCSDL = new List<DSKetNoiCSDL>();
        }
        public Guid Id { get; set; }
        public string MaHoSo { get; set; }
        public string? MaHoSoKhac { get; set; }
        public string? MaDinhDanh { get; set; }
        public string MaTTHC { get; set; }
        public string? TrangThaiDongBoDVC { get; set; }
        public string TenTTHC { get; set; }
        public string MaLinhVuc { get; set; }
        public string TenLinhVuc { get; set; }
        public string? KenhThucHien { get; set; }
        public string SoGiayToChuHoSo { get; set; }
        public string? ChuHoSo { get; set; }
        public string LoaiDoiTuong { get; set; }
        public string MaKetQuaChinh { get; set; }
        public string MaDoiTuong { get; set; } = "";
        public string? ThongTinKhac { get; set; } = "";
        public string? DinhKemKetQua { get; set; }
        public string? Email { get; set; } = "";
        public string? Fax { get; set; } = "";
        public string? SoDienThoai { get; set; }
        public string? TrichYeuHoSo { get; set; }
        public string NgayTiepNhan { get; set; }
        public string? NgayHenTra { get; set; }
        public string? NgayYeuCauBoSung { get; set; }
        public string TrangThaiHoSo { get; set; }
        public string? NgayTra { get; set; } = "";
        public string? ThongTinTra { get; set; } = "";
        public string HinhThuc { get; set; }
        public string? NgayKetThucXuLy { get; set; } = "";
        public string? DonViXuLy { get; set; }
        public string? GhiChu { get; set; } = "";
        public List<QuaTrinhXuLyHoSo>? QuaTrinhXuLyHoSos { get; set; }
        public List<TepDinhKem>? TaiLieuNop { get; set; }
        public List<LePhi>? DanhSachLePhi { get; set; }
        public List<TepDinhKemKhac>? DanhSachTepDinhKemKhac { get; set; }
        public List<HoSoBoSung>? DanhSachHoSoBoSung { get; set; }
        public List<GiayToKetQua>? DanhSachGiayToKetQua { get; set; }
        public string NoiNopHoSo { get; set; }
        public string HoSoCoThanhPhanSoHoa { get; set; }
        public string TaiKhoanDuocXacThucVoiVNeID { get; set; }
        public string DuocThanhToanTrucTuyen { get; set; }
        public string? NgayTuChoi { get; set; } = "";
        public string? SoDinhDanh { get; set; } = "";
        public List<DinhDanhCHS> DinhDanhCHS { get; set; }
        public string NgayNopHoSo { get; set; }
        public List<DSKetNoiCSDL> DSKetNoiCSDL { get; set; }
        public bool LaHoSoChungThuc { get; set; }
    }
    public class ThuTucDto
    {
        public string MaKetQuaChinh { get; set; }
        public string TenTTHC { get; set; }
    }
    public class QuaTrinhXuLyHoSo
    {
        public Guid Id { get; set; }
        public string MaHoSo { get; set; }
        public string NguoiXuLy { get; set; }
        public string? ChucDanh { get; set; } = "";
        public string ThoiDiemXuLy { get; set; }
        public string? PhongBanXuLy { get; set; } = "";
        public string? NoiDungXuLy { get; set; } = "";
        public string TrangThai { get; set; }
        public string? NgayBatDau { get; set; } = "";
        public string? NgayKetThucTheoQuyDinh { get; set; } = "";
    }
    public class HoSoBoSung
    {
        public int HoSoBoSungId { get; set; }
        public string NguoiYeuCauBoSung { get; set; }
        public string NoiDungBoSung { get; set; }
        public DateTime NgayBoSung { get; set; }
        public string? NguoiTiepNhanBoSung { get; set; }
        public string? ThongTinTiepNhan { get; set; }
        public string? NgayTiepNhanBoSung { get; set; }
        public bool TrangThaiBoSung { get; set; }
        public List<TepDinhKem>? DanhSachGiayToBoSung { get; set; }
        public List<LePhi>? DanhSachLePhiBoSung { get; set; }
        public DateTime NgayHenTraTruoc { get; set; }
        public DateTime? NgayHenTraMoi { get; set; }


    }
    public class DSKetNoiCSDL
    {
        public string MaCSDL { get; set; }
    }
    public class DinhDanhCHS
    {
        public string LoaiDinhDanh { get; set; }
        public string SoDinhDanh { get; set; }
    }
    public class GiayToKetQua
    {
        public string TenGiayTo { get; set; }
        public string? MaThanhPhanHoSo { get; set; } = "";
        public string? GiayToId { get; set; } = "";
        public string DuongDanTepTinKetQua { get; set; }
        public string MaGiayToKetQua { get; set; }

    }
    public class LePhi
    {
        public Guid Id { get; set; }
        public string TenPhiLePhi { get; set; }
        public string MaPhiLePhi { get; set; }
        public string HinhThucThu { get; set; }
        public string Gia { get; set; }
        public string LoaiPhiLePhi { get; set; }
        public string TrangThai { get; set; }


    }

    public class TepDinhKemKhac
    {
        public string TenGiayTo { get; set; }
        public int SoLuong { get; set; }
        public int LoaiGiayTo { get; set; }
    }
    public class TepDinhKem
    {
        public Guid Id { get; set; }
        public string? TepDinhKemId { get; set; } = "";
        public string TenTepDinhKem { get; set; }
        public bool? IsDeleted { get; set; }
        public string MaThanhPhanHoSo { get; set; }
        public string DuongDanTaiTepTin { get; set; }
        public string DuocSoHoa { get; set; }
        public string DuocTaiSuDung { get; set; }
        public string DuocLayTuKhoDMQG { get; set; } = "1";
        public string? MaKetQuaThayThe { get; set; } = "";
        public string? DinhKemGoc { get; set; } = "";
    }
}