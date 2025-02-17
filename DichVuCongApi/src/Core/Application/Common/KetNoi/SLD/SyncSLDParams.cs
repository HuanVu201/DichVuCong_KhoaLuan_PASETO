namespace TD.DichVuCongApi.Application.Common.KetNoi.SLD;
public class SyncSLDResponseWrapper
{
    public SyncSLDResult result { get; set; }
}

public class SyncSLDResult
{
    public string message { get; set; }
    public int error_code { get; set; }
    public List<SyncSLDResponseData> data { get; set; }
}

public class SyncSLDResponseData
{
    public string loaiKetQua { get; set; }
    public string ngayBanHanh { get; set; }
    public string soQuyetDinh { get; set; }
    public string coQuanBanHanh { get; set; }
    public string trichYeu { get; set; }
    public string acceptKey { get; set; }
    public string loaiDuLieu { get; set; }
    public string maHoSo { get; set; }
    public string maLinhVuc { get; set; }
    public string tenLinhVuc { get; set; }
    public string kenhThucHien { get; set; }
    public string loaiDoiTuong { get; set; }
    public string hinhThucTra { get; set; }
    public string maTTHC { get; set; }
    public string tenTTHC { get; set; }
    public string hoVaTen { get; set; }
    public string ngayThangNamSinh { get; set; }
    public string gioiTinhId { get; set; }
    public string danTocId { get; set; }
    public string cmnd { get; set; }
    public string cmnD_NgayCap { get; set; }
    public string cmnD_NoiCap { get; set; }
    public string maTinh { get; set; }
    public string maHuyen { get; set; }
    public string maXa { get; set; }
    public string hktT_MaTinh { get; set; }
    public string hktT_MaHuyen { get; set; }
    public string hktT_MaXa { get; set; }
    public string hktT_MaThon { get; set; }
    public string hktT_ChiTiet { get; set; }
    public string nohT_MaTinh { get; set; }
    public string nohT_MaHuyen { get; set; }
    public string nohT_MaXa { get; set; }
    public string nohT_MaThon { get; set; }
    public string nohT_ChiTiet { get; set; }
    public string soDienThoai { get; set; }
    public string email { get; set; }
    public string ngayTiepNhan { get; set; }
    public string ngayHenTra { get; set; }
    public string ngayKetThucXuLy_ThucTe { get; set; }
    public string donViXuLy { get; set; }
    public string noiNopHoSo { get; set; }
    public string hoSoCoThanhPhanSoHoa { get; set; }
    public string taiKhoanDuocXacThucVoiVNeID { get; set; }
    public string duocThanhToanTrucTuyen { get; set; }
    public string loaiDinhDanh { get; set; }
    public string soDinhDanh { get; set; }
    public string maCSDL { get; set; }
    public string soTaiKhoan { get; set; }
    public string nganHang { get; set; }
    public string statusId { get; set; }
    public string urlDetail { get; set; }
    public string submitedDate { get; set; }
    public string certificateExtentData { get; set; }
}

public class XmlResponseSLD
{
    public ExtentData ExtentData { get; set; }
}

public class ExtentData
{
    public DanhsachTaiLieuNop DanhsachTaiLieuNop { get; set; }
    public DanhSachGiayToKetQua DanhSachGiayToKetQua { get; set; }
}

public class DanhsachTaiLieuNop
{
    public DanhsachTaiLieuNop()
    {
        TaiLieuNop = new List<TaiLieuNop>();
    }

    public DanhsachTaiLieuNop(TaiLieuNop taiLieuNop)
    {
        TaiLieuNop = new List<TaiLieuNop> { taiLieuNop };
    }
    public List<TaiLieuNop> TaiLieuNop { get; set; }
}

public class TaiLieuNop
{
    public string TepDinhKemId { get; set; }
    public string TenTepDinhKem { get; set; }
    public string IsDeleted { get; set; }
    public string DuongDanTaiTepTin { get; set; }
    public string DuocSoHoa { get; set; }
    public string DuocTaiSuDung { get; set; }
    public string DuocLayTuKhoDMQG { get; set; }
    public string MaKetQuaThayThe { get; set; }
}

public class DanhSachGiayToKetQua
{
    public List<GiayToKetQua> GiayToKetQua { get; set; }
}

public class GiayToKetQua
{
    public string TenGiayTo { get; set; }
    public string MaThanhPhanHoSo { get; set; }
    public string GiayToId { get; set; }
    public string DuongDanTepTinKetQua { get; set; }
    public string MaGiayToKetQua { get; set; }
}

public class HoSoBTXH
{
    public string AcceptKey { get; set; }
    public string LoaiDuLieu { get; set; }
    public string MaHoSo { get; set; }
    public string MaLinhVuc { get; set; }
    public string LoaiKetQua { get; set; }
    public string SoQuyetDinh { get; set; }
    public string CoQuanBanHanh { get; set; }
    public string TrichYeu { get; set; }
    public string NgayBanHanh { get; set; }
    public string TenLinhVuc { get; set; }
    public string KenhThucHien { get; set; }
    public string LoaiDoiTuong { get; set; }
    public string HinhThucTra { get; set; }
    public string MaTTHC { get; set; }
    public string TenTTHC { get; set; }
    public string HoVaTen { get; set; }
    public string NgayThangNamSinh { get; set; }
    public string GioiTinhId { get; set; }
    public string DanTocId { get; set; }
    public string CMND { get; set; }
    public string CMND_NgayCap { get; set; }
    public string CMND_NoiCap { get; set; }
    public string MaTinh { get; set; }
    public string MaHuyen { get; set; }
    public string MaXa { get; set; }
    public string HKTT_MaTinh { get; set; }
    public string HKTT_MaHuyen { get; set; }
    public string HKTT_MaXa { get; set; }
    public string HKTT_MaThon { get; set; }
    public string HKTT_ChiTiet { get; set; }
    public string NOHT_MaTinh { get; set; }
    public string NOHT_MaHuyen { get; set; }
    public string NOHT_MaXa { get; set; }
    public string NOHT_MaThon { get; set; }
    public string NOHT_ChiTiet { get; set; }
    public string SoDienThoai { get; set; }
    public string Email { get; set; }
    public string NgayTiepNhan { get; set; }
    public string DonViXuLy { get; set; }
    public string NoiNopHoSo { get; set; }
    public string HoSoCoThanhPhanSoHoa { get; set; }
    public string TaiKhoanDuocXacThucVoiVNeID { get; set; }
    public string DuocThanhToanTrucTuyen { get; set; }
    public string LoaiDinhDanh { get; set; }
    public string SoDinhDanh { get; set; }
    public string MaCSDL { get; set; }
    public string StatusId { get; set; }
    public string SubmitedDate { get; set; }
    public string UrlDetail { get; set; }
    public string CertificateExtentData { get; set; }
}
public class TienTrinhHoSoBTXH
{
    public string AcceptKey { get; set; }
    public string MaHoSo { get; set; }
    public string TaiKhoanXuLy { get; set; }
    public string NguoiXuLy { get; set; }
    public string ChucDanh { get; set; }
    public string ThoiDiemXuLy { get; set; }
    public string DonViXuLy { get; set; }
    public string NoiDungXuLy { get; set; }
    public string StatusId { get; set; }
    public string NgayBatDau { get; set; }
    public string NgayKetThucTheoQuyDinh { get; set; }
    public string UseridCreated { get; set; }
    public object UseridEdited { get; set; }
    public object DateCreated { get; set; }
    public string DateEdited { get; set; }
}
public class ResponseAPIDongBoHoSo
{
    public string error_code { get; set; }
    public string message { get; set; }
}

public static class BaoTroXaHoiTinhEFormData
{
    public class SelectBox
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }
    public class SelectBoxWithType : SelectBox
    {
        public string __type { get; set; }
        
    }
    public class ThongTinCon
    {
        public string conHoVaTen { get; set; }
        public string conNgaySinh { get; set; }
        public string ConThu { get; set; }
    }
    public class ThoiHuongTroCapXaHoi
    {
        public string nycHoVaTen { get; set; }
        public string nycNgaySinh { get; set; }
        public SelectBox nycGioiTinh { get; set; }
        public SelectBox nycLoaiGiayToTuyThan { get; set; }
        public string nycSoGiayTo { get; set; }
        public string nycNgayCapGiayTo { get; set; }
        public SelectBox nycNoiCapGiayTo { get; set; }
        public string nycSoDienThoai { get; set; }
        public string nycEmail { get; set; }
        public string nycNoiOHienTai { get; set; }
        public SelectBox QuanHe { get; set; }
        public string HoVaTen { get; set; }
        public string NgaySinh { get; set; }
        public SelectBox GioiTinh { get; set; }
        public SelectBoxWithType DanToc { get; set; }
        public SelectBox LoaiGiayToTuyThan { get; set; }
        public string SoGiayTo { get; set; }
        public string NgayCapGiayTo { get; set; }
        public SelectBox NoiCapGiayTo { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }
        public string DiaChiThuongTru { get; set; }
        public string NoiOHienTai { get; set; }
        public string nocHoVaTen { get; set; }
        public bool? BHYT { get; set; }
        public bool? HoNgheo { get; set; }
        public string HinhThucNhanTien { get; set; }
        public string SoDienThoaiLH { get; set; }
        public string EmailLH { get; set; }
        public SelectBox TinhTrangDiHoc { get; set; }
        public bool LuongHuu { get; set; }
        public string NgayHuongbhxh { get; set; }
        public bool? BTXH { get; set; }
        public string NgayHuongbtxh { get; set; }
        public bool? NCC { get; set; }
        public string NgayHuongncc { get; set; }
        public bool? Khac { get; set; }
        public string NgayHuongkhac { get; set; }
        public string SoGxnKT { get; set; }
        public string NgayCapGxnKT { get; set; }
        public string NoiCapGxnKT { get; set; }
        public SelectBox MucDoKhuyetTat { get; set; }
        public bool? VanDong { get; set; }
        public bool? ThanKinh { get; set; }
        public bool? Nhin { get; set; }
        public bool? TriTue { get; set; }
        public bool? Nghe { get; set; }
        public bool? DtKhac { get; set; }
        public bool? ThamGiaLamViec { get; set; }
        public SelectBox TinhTrangHonNhan { get; set; }
        public string SoCon { get; set; }
        public string SoConDuoiBaTuoi { get; set; }
        public SelectBox KNTuPhucVu { get; set; }
        public string ncsHoVaTen { get; set; }
        public string ncsNgaySinh { get; set; }
        public SelectBox ncsGioiTinh { get; set; }
        public string ncsSoGiayTo { get; set; }
        public string NgayLamDon { get; set; }
        public string HoVaTenDuoi { get; set; }
        public string DiaPhuong { get; set; }
        public string ExportTemplateCustom { get; set; }
        public List<ThongTinCon> ThongTinCon { get; set; }
        public SelectBox TenNganHang { get; set; }
        public string SoTaiKhoan { get; set; }
        public string ChuTaiKhoan { get; set; }
        public string LyDo { get; set; }
        public string btxhSoTien { get; set; }
        public string btxhNgayHuong { get; set; }
        public string LyDoKhongLamViec { get; set; }
        public string nycNgaySinhText { get; set; }
        public string nycNgayCapGiayToText { get; set; }
        public string NgaySinhText { get; set; }
        public string NgayCapGiayToText { get; set; }
        public string NgayCapGxnKTText { get; set; }
        public string ncsNgaySinhText { get; set; }
        public string ExportEformDataTime { get; set; }
    }
    public class HoTroMaiTangPhi
    {
        public string nktHoVaTen { get; set; }
        public string nktNgaySinh { get; set; }
        public SelectBox nktGioiTinh { get; set; }
        public SelectBoxWithType nktDanToc { get; set; }
        public string nktHoKhauThuongTru { get; set; }
        public string nktThoiGian { get; set; }
        public SelectBox nktNguyenNhanChet { get; set; }
        public string nktThoiGianMaiTang { get; set; }
        public string nktDiaDiemMaiTang { get; set; }
        public string DoiTuongMaiTang { get; set; }
        public string HoVaTen { get; set; }
        /// <summary>
        /// yyyy/MM/dd
        /// </summary>
        public string NgaySinh { get; set; }
        public SelectBox LoaiGiayToTuyThan { get; set; }
        public string SoGiayTo { get; set; }
        public string NgayCapGiayTo { get; set; }
        public SelectBox NoiCapGiayTo { get; set; }
        public string DiaChiThuongTru { get; set; }
        public string NoiOHienTai { get; set; }
        public SelectBox QuanHe { get; set; }
        public string HinhThucNhanTien { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }
        /// <summary>
        /// ngày 17 tháng 6 năm 2024
        /// </summary>
        public string NgayLamDon { get; set; }
        public string HoVaTenDuoi { get; set; }
        /// <summary>
        /// ngày 17 tháng 6 năm 2024
        /// </summary>
        public string nktNgayChet { get; set; }
        /// <summary>
        /// ngày 17 tháng 6 năm 2024
        /// </summary>
        public string nktNganktNgayMaiTangyChet { get; set; }
        public string DiaPhuong { get; set; }
        public string ExportTemplateCustom { get; set; }
        /// <summary>
        /// yyyy/MM/dd
        /// </summary>
        public string nktNgaySinhText { get; set; }
        /// <summary>
        /// yyyy/MM/dd
        /// </summary>
        public string nktThoiGianText { get; set; }
        /// <summary>
        /// yyyy/MM/dd
        /// </summary>
        public string nktThoiGianMaiTangText { get; set; }
        /// <summary>
        /// yyyy/MM/dd
        /// </summary>
        public string NgaySinhText { get; set; }
        public string NgayCapGiayToText { get; set; }
        /// <summary>
        /// ngày 17 tháng 6 năm 2024
        /// </summary>
        public string ExportEformDataTime { get; set; }
    }
}
