using TD.DichVuCongApi.Application.Common.KetNoi.Classes;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.KhaiSinhKhaiTu;
public class KhaiSinhKhaiTuSettings
{
    public KhaiSinhKhaiTu_UrlDVCLT UrlDVCLT { get; set; }
    //public KhaiSinhKhaiTu_UrlDVCCA UrlDVCCA { get; set; }
    public KhaiSinhKhaiTu_BTPUrl UrlBTPApi { get; set; }
    public KhaiSinhKhaiTu_BTPUrl? UrlBTPTestApi { get; set; }
    public string BTPConsumerKey { get; set; }
    public string BTPConsumerSecret { get; set; }
    public bool EnableGetData { get; set; }
    public bool EnableScan { get; set; }
    public bool EnableUpdateStatus { get; set; }
    public bool? LayThongTinNguoiNopLamChuHoSoKS { get; set; }
    public string MaTinh { get; set; }
    public List<string>? DanhSachMaThuTucKhaiSinh { get; set; }
    public DanhSachThuTucDongBoDVC DanhSachThuTucDongBoDVC { get; set; }

}

public class DanhSachThuTucDongBoDVC
{
    public Dictionary<string, string> CapXa { get; set; }
    public Dictionary<string, string> CapHuyen { get; set; }
}
public class KhaiSinhKhaiTu_BTPUrl
{
    public string Base { get; set; }
    public string NhanDKHT { get; set; }
    public string LayKetQua { get; set; }
    public string SoLuongHoSoTraVe { get; set; }
}
public class KhaiSinhKhaiTu_UrlDVCLT
{
    public int SoLuongThemHoSoBatDongBo { get; set; }
    public string Base { get; set; }
    public string SendStatusUrl { get; set; }
    public string SoLuongGuiTrangThaiDVCLT { get; set; }
    public string User { get; set; }
    public string GetToken { get; set; }
    public string Password { get; set; }
    public string LayDanhSachHoSo { get; set; }
    public string SoLuongDongBoTrangThai { get; set; }
    public string CapNhatDaNhanHoSoUrl { get; set; }
}
public class KhaiSinhKhaiTu_UrlDVCCA
{
    public string Base { get; set; }
    public string SecretId { get; set; }
    public string SecretPass { get; set; }
    public string CapNhatTrangThaiUrl { get; set; }
    public string GetToken { get; set; }
    public string SoLuongDongBoTrangThai { get; set; }
}