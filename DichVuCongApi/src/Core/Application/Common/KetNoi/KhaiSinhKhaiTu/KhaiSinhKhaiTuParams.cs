using TD.DichVuCongApi.Application.Business.HoSoApp;

namespace TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
public class KhaiSinhKhaiTu_GetTokenRequest
{
    public string userName { get; set; }
    public string password { get; set; }
}


public class KhaiSinhKhaiTu_PushManualResponse
{
    public string MoTa { get; set; }
    public string TrangThaiXuLy { get; set; }
    public string ThoiGianThucHien { get; set; }
    public string? NoiDungChiTiet { get; set; }
    public string MaHoSoMCDT { get; set; }
    public string MaHoSoLT { get; set; }
}
public class KhaiSinhKhaiTu_GetTokenResponse
{
    public string token { get; set; }
    public string refreshToken { get; set; }
    public string refreshTokenExpiryTime { get; set; }
}

public class KhaiSinhKhaiTu_FileDinhKem
{
    public int id { get; set; }
    public int loaiGiayTo { get; set; }
    public string tenGiayTo { get; set; }
    public string tenTepDinhKem { get; set; }
    public int huyGiayTo { get; set; }
    public string duLieuTepDinhKem { get; set; }
}

public class KhaiSinhKhaiTu_DetailHoSo
{
    public int maDonVi { get; set; }
    public string maTTHC { get; set; }
    public string module { get; set; }
    public string maHoSo { get; set; }
    public string ngayTiepNhan { get; set; }
    public string techId { get; set; }
    public string data { get; set; }
    public List<KhaiSinhKhaiTu_FileDinhKem> fileDinhKem { get; set; }
}
public class KhaiSinhKhaiTu_DetailHoSo_Wrapper
{
    public KhaiSinhKhaiTu_DetailHoSo data { get; set; }
}

public class KhaiSinhKhaiTu_HoSo
{
    public string id { get; set; }
    public int maDonVi { get; set; }
    public string maTTHC { get; set; }
    public string module { get; set; }
    public string maHoSo { get; set; }
    public string ngayTiepNhan { get; set; }
    public string techId { get; set; }
}
public class KhaiSinhKhaiTu_HoSo_Wrapper
{
   public List<KhaiSinhKhaiTu_HoSo> data { get; set; }
}
public class KhaiSinh_LienThong
{
    public string maGCS { get; set; }
    public string ngayCapGCS { get; set; }
    public string loaiDangKy { get; set; }
    public string noiDangKy { get; set; }
    public string soLuongBanSao { get; set; }
    public string nksHoTen { get; set; }
    public string nksGioiTinh { get; set; }
    public string nksNgaySinh { get; set; }
    public string nksNgaySinhBangChu { get; set; }
    public string nksNoiSinh { get; set; }
    public string nksNoiSinhDVHC { get; set; }
    public string nksNoiSinhNuocNgoai { get; set; }
    public string nksQueQuan { get; set; }
    public string nksDanToc { get; set; }
    public string nksDanTocKhac { get; set; }
    public string nksQuocTich { get; set; }
    public string nksQuocTichKhac { get; set; }
    public string nksLoaiKhaiSinh { get; set; }
    public string meHoTen { get; set; }
    public string meNgaySinh { get; set; }
    public string meDanToc { get; set; }
    public string meDanTocKhac { get; set; }
    public string meQuocTich { get; set; }
    public string meQuocTichKhac { get; set; }
    public string meLoaiCuTru { get; set; }
    public string meNoiCuTru { get; set; }
    public string meLoaiGiayToTuyThan { get; set; }
    public string meSoGiayToTuyThan { get; set; }
    public string meXacThucThongTin { get; set; }
    public string chaHoTen { get; set; }
    public string chaNgaySinh { get; set; }
    public string chaDanToc { get; set; }
    public string chaDanTocKhac { get; set; }
    public string chaQuocTich { get; set; }
    public string chaQuocTichKhac { get; set; }
    public string chaLoaiCuTru { get; set; }
    public string chaNoiCuTru { get; set; }
    public string chaLoaiGiayToTuyThan { get; set; }
    public string chaSoGiayToTuyThan { get; set; }
    public string chaXacThucThongTin { get; set; }
    public string nycHoTen { get; set; }
    public string nycQuanHe { get; set; }
    public string nycLoaiGiayToTuyThan { get; set; }
    public string nycGiayToKhac { get; set; }
    public string nycSoGiayToTuyThan { get; set; }
    public string nycNgayCapGiayToTuyThan { get; set; }
    public string nycNoiCapGiayToTuyThan { get; set; }
    public string nycSoDienThoai { get; set; }
    public string nycEmail { get; set; }
    public string nycXacThucThongTin { get; set; }
}

public class KhaiSinh_DataHoSo
{
    public KhaiSinh_LienThong hoTich { get; set; }
}

public class KhaiTu_LienThong
{
    public string maGBT { get; set; }
    public string ngayCapGBT { get; set; }
    public string loaiDangKy { get; set; }
    public string noiDangKy { get; set; }
    public string soLuongBanSao { get; set; }
    public string nktHoTen { get; set; }
    public string nktGioiTinh { get; set; }
    public string nktNgaySinh { get; set; }
    public string nktDanToc { get; set; }
    public string nktDanTocKhac { get; set; }
    public string nktQuocTich { get; set; }
    public string nktQuocTichKhac { get; set; }
    public string nktLoaiCuTru { get; set; }
    public string nktNoiCuTru { get; set; }
    public string nktLoaiGiayToTuyThan { get; set; }
    public string nktSoGiayToTuyThan { get; set; }
    public string nktNgayCapGiayToTuyThan { get; set; }
    public string nktNoiCapGiayToTuyThan { get; set; }
    public string nktNgayChet { get; set; }
    public string nktGioPhutChet { get; set; }
    public string nktNoiChet { get; set; }
    public string nktNguyenNhanChet { get; set; }
    public string nktXacThucThongTin { get; set; }
    public string gbtLoai { get; set; }
    public string gbtSo { get; set; }
    public string gbtNgay { get; set; }
    public string gbtCoQuanCap { get; set; }
    public string nycHoTen { get; set; }
    public string nycQuanHe { get; set; }
    public string nycLoaiGiayToTuyThan { get; set; }
    public string nycGiayToKhac { get; set; }
    public string nycSoGiayToTuyThan { get; set; }
    public string nycNgayCapGiayToTuyThan { get; set; }
    public string nycNoiCapGiayToTuyThan { get; set; }
    public string nycSoDienThoai { get; set; }
    public string nycEmail { get; set; }
    public string nycXacThucThongTin { get; set; }
    public string nktGiayToKhac { get; set; }
}
public class KhaiTu_DataHoSo
{
    public KhaiTu_LienThong hoTich { get; set; }
}


public class KhaiSinhKhaiTu_BTP_TokenResponse
{
    public string access_token { get; set; }
    public string scope { get; set; }
    public string token_type { get; set; }
    public int expires_in { get; set; }
}

public class KhaiSinhKhaiTu_HoTich_KhaiSinh_BTPScanResponse
{
    public string maDonVi { get; set; }
    public string maTinh { get; set; }
    public string module { get; set; }
    public string maHoSoLT { get; set; }
    public string maHoSoMCDT { get; set; }
    public string? errors { get; set; }
    public string trangThai { get; set; }
    public string? thoiGianThucHien { get; set; }
    public string? ghiChu { get; set; }
    public HoTich_KhaiSinh_KetQuaXuLy? ketQuaXuLy { get; set; }
    public string? nguoiXuLy { get; set; }
    public string chucDanh { get; set; }
    public string phongBanXuLy { get; set; }
    public string? noiDungXuLy { get; set; }
    public string? hanBoSungHoSo { get; set; }
}
public class KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse
{
    public string maDonVi { get; set; }
    public string maTinh { get; set; }
    public string module { get; set; }
    public string maHoSoLT { get; set; }
    public string maHoSoMCDT { get; set; }
    public string? errors { get; set; }
    public string trangThai { get; set; }
    public string? thoiGianThucHien { get; set; }
    public string? ghiChu { get; set; }
    public HoTich_KhaiTu_KetQuaXuLy? ketQuaXuLy { get; set; }
    public string? nguoiXuLy { get; set; }
    public string chucDanh { get; set; }
    public string phongBanXuLy { get; set; }
    public string? noiDungXuLy { get; set; }
    public string? hanBoSungHoSo { get; set; }
}


public class PushBTPResonse
{
    public string status { get; set; }
    public string statusDescription { get; set; }
    public string errorCode { get; set; }
    public string errorDescription { get; set; }
}

public class ScanHoTichRequest
{
    public List<string> maDinhDanhHoSo { get; set; }
    public string maTinh { get; set; }
    public string module { get; set; }
}

public class ScanHoTichResponse<T>
{
    /// <summary>
    /// 1 - thành công
    /// 0 - thất bại
    /// </summary>
    public int status { get; set; }
    public string statusDescription { get; set; }
    public List<T> value { get; set; }
}

public class HoTichKhaiSinh
{
    public string maGCS { get; set; }
    public string ngayCapGCS { get; set; }
    public string loaiDangKy { get; set; }
    public string noiDangKy { get; set; }
    public string soLuongBanSao { get; set; }
    public string nksHoTen { get; set; }
    public string nksGioiTinh { get; set; }
    public string nksNgaySinh { get; set; }
    public string nksNgaySinhBangChu { get; set; }
    public string nksNoiSinhNuocNgoai { get; set; }
    public KhaiSinhKhaiTu_DiaChi nksNoiSinh { get; set; }
    public KhaiSinhKhaiTu_DiaChi nksQueQuan { get; set; }
    public string nksDanToc { get; set; }
    public string nksDanTocKhac { get; set; }
    public string nksQuocTich { get; set; }
    public string nksLoaiKhaiSinh { get; set; }
    public string nksLoaiGiayToTuyThan { get; set; }
    public string nksSoGiayToTuyThan { get; set; }
    public string nksNgayCapGiayToTuyThan { get; set; }
    public string nksNoiCapGiayToTuyThan { get; set; }
    public string meHoTen { get; set; }
    public string meNgaySinh { get; set; }
    public string meDanToc { get; set; }
    public string meDanTocKhac { get; set; }
    public string meQuocTich { get; set; }
    public string meQuocTichKhac { get; set; }
    public string meLoaiCuTru { get; set; }
    public KhaiSinhKhaiTu_DiaChi meNoiCuTru { get; set; }
    public string meLoaiGiayToTuyThan { get; set; }
    public string meGiayToKhac { get; set; }
    public string meSoGiayToTuyThan { get; set; }
    public string meSoDDCN { get; set; }
    public string meXacThucThongTin { get; set; }
    public string chaHoTen { get; set; }
    public string chaNgaySinh { get; set; }
    public string chaDanToc { get; set; }
    public string chaDanTocKhac { get; set; }
    public string chaQuocTich { get; set; }
    public string chaQuocTichKhac { get; set; }
    public string chaLoaiCuTru { get; set; }
    public KhaiSinhKhaiTu_DiaChi chaNoiCuTru { get; set; }
    public string chaLoaiGiayToTuyThan { get; set; }
    public string chaSoDDCN { get; set; }
    public string chaGiayToKhac { get; set; }
    public string chaSoGiayToTuyThan { get; set; }
    public string chaXacThucThongTin { get; set; }
    public string nycHoTen { get; set; }
    public string nycQuanHe { get; set; }
    public string nycLoaiGiayToTuyThan { get; set; }
    public string nycSoDDCN { get; set; }
    public string nycGiayToKhac { get; set; }
    public string nycSoGiayToTuyThan { get; set; }
    public string nycNgayCapGiayToTuyThan { get; set; }
    public string nycNoiCapGiayToTuyThan { get; set; }
    public string nycSoDienThoai { get; set; }
    public string nycEmail { get; set; }
    public string nycLoaiCuTru { get; set; }
    public KhaiSinhKhaiTu_DiaChi nycNoiCuTru { get; set; }
    public string nycXacThucThongTin { get; set; }
    public string soDangKyNuocNgoai { get; set; }
    public string ngayDangKyNuocNgoai { get; set; }
    public string cqNuocNgoaiDaDangKy { get; set; }
    public string qgNuocNgoaiDaDangKy { get; set; }
}


public class HoTichKhaiTu
{
    public string maGBT { get; set; }
    public string ngayCapGBT { get; set; }
    public string loaiDangKy { get; set; }
    public string noiDangKy { get; set; }
    public string soLuongBanSao { get; set; }
    public string nktHoTen { get; set; }
    public string nktGioiTinh { get; set; }
    public string nktNgaySinh { get; set; }
    public string nktDanToc { get; set; }
    public string nktDanTocKhac { get; set; }
    public string nktQuocTich { get; set; }
    public string nktQuocTichKhac { get; set; }
    public string nktLoaiCuTru { get; set; }
    public KhaiSinhKhaiTu_DiaChi nktNoiCuTru { get; set; }
    public string nktLoaiGiayToTuyThan { get; set; }
    public string nktSoGiayToTuyThan { get; set; }
    public string nktNgayCapGiayToTuyThan { get; set; }
    public string nktNoiCapGiayToTuyThan { get; set; }
    public string nktNgayChet { get; set; }
    public string nktGioPhutChet { get; set; }
    public KhaiSinhKhaiTu_DiaChi nktNoiChet { get; set; }
    public string nktNguyenNhanChet { get; set; }
    public string nktXacThucThongTin { get; set; }
    public string gbtLoai { get; set; }
    public string gbtSo { get; set; }
    public string gbtNgay { get; set; }
    public string gbtCoQuanCap { get; set; }
    public string nycHoTen { get; set; }
    public string nycQuanHe { get; set; }
    public string nycLoaiGiayToTuyThan { get; set; }
    public string nycGiayToKhac { get; set; }
    public string nycSoGiayToTuyThan { get; set; }
    public string nycNgayCapGiayToTuyThan { get; set; }
    public string nycNoiCapGiayToTuyThan { get; set; }
    public string nycSoDienThoai { get; set; }
    public string nycEmail { get; set; }
    public string nycXacThucThongTin { get; set; }
    public string nktGiayToKhac { get; set; }
    public KhaiSinhKhaiTu_DiaChi nycNoiCuTru { get; set; }
}
public class KhaiSinhKhaiTu_DiaChi
{
    public string maTinh { get; set; }
    public string maHuyen { get; set; }
    public string maXa { get; set; }
    public string dcChiTiet { get; set; }
}
public class DataHoTich
{
    public string maDonVi { get; set; }
    public string module { get; set; }
    public string maHoSoLT { get; set; }
    public string maHoSoMCDT { get; set; }
    public string ngayTiepNhan { get; set; }
    public string data { get; set; }
    public List<KhaiSinhKhaiTu_FileDinhKem> fileDinhKem { get; set; }
}

public class KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiRequest
{
    public string maTTHC { get; set; }
    public string soHoSoLT { get; set; }
    public int coQuanXuLy { get; set; }
    public string maHoSo { get; set; }
    public int trangThai { get; set; }
    public string thoiGianThucHien { get; set; }
    public string ghiChu { get; set; }
    public string ketQuaXuLy { get; set; }
    public string nguoiXuLy { get; set; }
    public string chucDanh { get; set; }
    public string phongBanXuLy { get; set; }
    public string noiDungXuLy { get; set; }
    public string ngayBatDau { get; set; }
    public string ngayKetThucTheoQuyDinh { get; set; }
    public string ngayHenTraTruoc { get; set; }
    public string ngayHenTraMoi { get; set; }
    public string hanBoSungHoSo { get; set; }
}
public class KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiResponse
{
    public object errors { get; set; }
    public string type { get; set; }
    public string title { get; set; }
    public int status { get; set; }
    public string traceId { get; set; }

}

public class KhaiSinhKhaiTu_DVCLT_CapNhatTrangThai_RequestToken
{
    public string SecretId { get; set; }
    public string SecretPass { get; set; }
}
public class KhaiSinhKhaiTu_DVCLT_CapNhatTrangThai_ResponseToken
{
    public string token { get; set; }
    public string expiration { get; set; }
}
public class LienThong_KhaiSinh_KetQuaXuLy
{
    public string soDinhDanh { get; set; }
    public string ngayDangKy { get; set; }
    public string ndkksMaTinh { get; set; }
    public string ndkksMaHuyen { get; set; }
    public string ndkksMaXa { get; set; }
    public string nksHoTen { get; set; }
    public int? nksGioiTinh { get; set; }
    public string nksNgaySinh { get; set; }
    public string nksNgaySinhBangChu { get; set; }
    public string nksDanToc { get; set; }
    public string nksQueQuan { get; set; }
    public string nksQuocTich { get; set; }
    public string nksNoiSinhMaTinh { get; set; }
    public string nksNoiSinh { get; set; }
    public string meHoTen { get; set; }
    public string meNgaySinh { get; set; }
    public string meDanToc { get; set; }
    public string meQuocTich { get; set; }
    public int? meLoaiCuTru { get; set; }
    public string meNoiCuTru { get; set; }
    public string meSoGiayTo { get; set; }
    public string chaHoTen { get; set; }
    public string chaNgaySinh { get; set; }
    public string chaDanToc { get; set; }
    public string chaQuocTich { get; set; }
    public int? chaLoaiCuTru { get; set; }
    public string chaNoiCuTru { get; set; }
    public string chaSoGiayTo { get; set; }
    public string nycHoTen { get; set; }
    public string nycQuanHe { get; set; }
    public string nycSoGiayTo { get; set; }
    public string giayKhaiSinh { get; set; }
    public string soDangKy { get; set; }
    public string quyenSo { get; set; }
    public string trangSo { get; set; }
    public string maGiayToKetQua { get; set; }
}
public class HoTich_KhaiSinh_KetQuaXuLy
{
    public string soDinhDanh { get; set; }
    public string ngayDangKy { get; set; }
    public string ndkksMaTinh { get; set; }
    public string ndkksMaHuyen { get; set; }
    public string ndkksMaXa { get; set; }
    public string nksHoTen { get; set; }
    public int nksGioiTinh { get; set; }
    public string nksNgaySinh { get; set; }
    public string nksNgaySinhBangChu { get; set; }
    public string nksDanToc { get; set; }
    public KhaiSinhKhaiTu_DiaChi nksQueQuan { get; set; }
    public string nksQuocTich { get; set; }
    public KhaiSinhKhaiTu_DiaChi nksNoiSinh { get; set; }
    public string meHoTen { get; set; }
    public string meNgaySinh { get; set; }
    public string meDanToc { get; set; }
    public string meQuocTich { get; set; }
    public int? meLoaiCuTru { get; set; }
    public KhaiSinhKhaiTu_DiaChi meNoiCuTru { get; set; }
    public string meSoGiayTo { get; set; }
    public string chaHoTen { get; set; }
    public string chaNgaySinh { get; set; }
    public string chaDanToc { get; set; }
    public string chaQuocTich { get; set; }
    public int? chaLoaiCuTru { get; set; }
    public KhaiSinhKhaiTu_DiaChi chaNoiCuTru { get; set; }
    public string chaSoGiayTo { get; set; }
    public string nycHoTen { get; set; }
    public string nycQuanHe { get; set; }
    public string nycSoGiayTo { get; set; }
    public string giayKhaiSinh { get; set; }
    public string soDangKy { get; set; }
    public string quyenSo { get; set; }
    public string trangSo { get; set; }
}

public class HoTich_KhaiTu_KetQuaXuLy
{
    public string nktHoTen { get; set; }
    public int nktGioiTinh { get; set; }
    public string nktNgaySinh { get; set; }
    public string nktDanToc { get; set; }
    public string nktQuocTich { get; set; }
    public int nktLoaiCuTru { get; set; }
    public KhaiSinhKhaiTu_DiaChi nktNoiCuTru { get; set; }
    public string nktSoGiayTo { get; set; }
    public string nktNgayChet { get; set; }
    public KhaiSinhKhaiTu_DiaChi nktNoiChet { get; set; }
    public string nktNguyenNhanChet { get; set; }
    public string giayBaoTuLoai { get; set; }
    public string giayBaoTuSo { get; set; }
    public string nycHoTen { get; set; }
    public string nycSoGiayTo { get; set; }
    public string nycQuanHe { get; set; }
    public string soDangKy { get; set; }
    public string quyenSo { get; set; }
    public string trangSo { get; set; }
    public string? giayKhaiTu { get; set; }
    public string maGiayToKetQua { get; set; }
}

public class LienThong_KhaiTu_KetQuaXuLy
{
    public string nktHoTen { get; set; }
    public int nktGioiTinh { get; set; }
    public string nktNgaySinh { get; set; }
    public string nktDanToc { get; set; }
    public string nktQuocTich { get; set; }
    public int nktLoaiCuTru { get; set; }
    public string nktNoiCuTru { get; set; }
    public string nktSoGiayTo { get; set; }
    public string nktNgayChet { get; set; }
    public string nktNoiChet { get; set; }
    public string nktNguyenNhanChet { get; set; }
    public string giayBaoTuLoai { get; set; }
    public string giayBaoTuSo { get; set; }
    public string nycHoTen { get; set; }
    public string nycSoGiayTo { get; set; }
    public string nycQuanHe { get; set; }
    public string soDangKy { get; set; }
    public string quyenSo { get; set; }
    public string trangSo { get; set; }
    public string? giayKhaiTu { get; set; }
    public string maGiayToKetQua { get; set; }
}

public class DataDKKHEformWrapper
{
    public DataDKKHEform Data { get; set; }
}


public class DataDKKHEform
{
    public List<AnhDaiDien> voAnhDaiDien { get; set; }
    public string voHoTen { get; set; }
    public string voNgaySinh { get; set; }
    public EformDanhMuc voDanToc { get; set; }
    public EformDanhMuc voQuocTich { get; set; }
    public EformDanhMuc voLoaiGiayTo { get; set; }
    public string voNgayCapGiayToTuyThan { get; set; }
    public string voSoGiayTo { get; set; }
    public string voNoiCapGiayToTuyThan { get; set; }
    public EformDanhMuc voLoaiCuTru { get; set; }
    public int voSoLanKH { get; set; }
    public EformDanhMuc voLoaiTinhTrangHonNhan { get; set; }
    public EformDanhMuc voYeuCauXNTTHN { get; set; }
    public List<AnhDaiDien> chongAnhDaiDien { get; set; }
    public string chongHoTen { get; set; }
    public string chongNgaySinh { get; set; }
    public EformDanhMuc chongDanToc { get; set; }
    public EformDanhMuc chongQuocTich { get; set; }
    public EformDanhMuc chongLoaiGiayTo { get; set; }
    public string chongNgayCapGiayToTuyThan { get; set; }
    public string chongSoGiayTo { get; set; }
    public string chongNoiCapGiayToTuyThan { get; set; }
    public EformDanhMuc chongLoaiCuTru { get; set; }
    public int chongSoLanKH { get; set; }
    public EformDanhMuc chongLoaiTinhTrangHonNhan { get; set; }
    public EformDanhMuc chongYeuCauXNTTHN { get; set; }
    public string ghiChu { get; set; }
    public bool submit { get; set; }
    public EformDiaBan voNoiCuTruTinhThanh { get; set; }
    public EformDiaBan voNoiCuTruQuanHuyen { get; set; }
    public EformDiaBan voNoiCuTruXaPhuong { get; set; }
    public string voNoiCuTru { get; set; }
    public EformDiaBan chongNoiCuTruTinhThanh { get; set; }
    public EformDiaBan chongNoiCuTruQuanHuyen { get; set; }
    public EformDiaBan chongNoiCuTruXaPhuong { get; set; }
    public string chongNoiCuTru { get; set; }
    public int soBanSao { get; set; }

    public class AnhDaiDien
    {
        public string storage { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public int size { get; set; }
        public string type { get; set; }
        public string originalName { get; set; }
        public string hash { get; set; }
        public Data data { get; set; }
        public class Data
        {
            public string url { get; set; }
            public string baseUrl { get; set; }
            public string project { get; set; }
            public string form { get; set; }
        }
    }
}

public class EformDanhMuc
{
    public string Code { get; set; }
    public string Name { get; set; }
}

public class EformDiaBan
{
    public string __type { get; set; }
    public string maDiaBan { get; set; }
    public string tenDiaBan { get; set; }
}


public class DataDKKH
{
    public string chongLoaiTinhTrangHonNhan { get; set; }
    public string voLoaiTinhTrangHonNhan { get; set; }
    public string chongYeuCauXNTTHN { get; set; }
    public string chongTinhTrangHonNhan { get; set; }
    public string voTinhTrangHonNhan { get; set; }
    public string voYeuCauXNTTHN { get; set; }
    public string voNoiXNTTHN { get; set; }
    public string chongNoiXNTTHN { get; set; }
    public string loaiDangKy { get; set; }
    public string noiDangKy { get; set; }
    public string ngayXacLapQuanHeHonNhan { get; set; }
    public string ghiChu { get; set; }
    public int soBanSao { get; set; }
    public string soLuongBanSao { get; set; }
    public string chongHoTen { get; set; }
    public string chongNgaySinh { get; set; }
    public string chongDanToc { get; set; }
    public string chongDanTocKhac { get; set; }
    public string chongQuocTich { get; set; }
    public string chongCuTruNuocNgoai { get; set; }
    public string chongLoaiCuTru { get; set; }
    public NoiCuTruDKKH chongNoiCuTru { get; set; }
    public string chongLoaiGiayToTuyThan { get; set; }
    public string chongGiayToKhac { get; set; }
    public string chongSoGiayToTuyThan { get; set; }
    public string chongNgayCapGiayToTuyThan { get; set; }
    public string chongNoiCapGiayToTuyThan { get; set; }
    public string chongSoDDCN { get; set; }
    public int chongSoLanKH { get; set; }
    public string voHoTen { get; set; }
    public string voNgaySinh { get; set; }
    public string voDanToc { get; set; }
    public string voDanTocKhac { get; set; }
    public string voQuocTich { get; set; }
    public string voLoaiCuTru { get; set; }
    public NoiCuTruDKKH voNoiCuTru { get; set; }
    public string voLoaiGiayToTuyThan { get; set; }
    public string voGiayToKhac { get; set; }
    public string voSoGiayToTuyThan { get; set; }
    public string voNgayCapGiayToTuyThan { get; set; }
    public string voNoiCapGiayToTuyThan { get; set; }
    public string voSoDDCN { get; set; }
    public int voSoLanKH { get; set; }
}

public class NoiCuTruDKKH
{
    public string maTinh { get; set; }
    public string maHuyen { get; set; }
    public string maXa { get; set; }
    public string dcChiTiet { get; set; }
}

public class LienThongBTPDangKyKetHonRequest
{
    public string MaHoSo { get; set; }
    public string EformBase64Data { get; set; }
}