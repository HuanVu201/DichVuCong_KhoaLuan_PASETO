using TD.DichVuCongApi.Application.Common.KetNoi.Classes;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.LLTP;
public class LLTPServiceSettings
{
    public string UrlAPIDVC { get; set; }
    public string IdCoQuanSoTuPhapHeThongBo { get; set; }
    public int IdDanhMucHanhChinhTinh { get; set; }
    public BaseTokenSettings? Token { get; set; }
    public string MaDinhDanhDonVi { get; set; }
    public string MaTTHC { get; set; }
    public string AuthKeyLLTP { get; set; }
    public string UrlAPIDVC_BTP { get; set; }
    public string BaseUrl { get; set; }
    public bool EnableUpdateStatus { get; set; } = false;
    public bool EnableScan { get; set; } = false;
    public LLTPServiceSettings_VNeID_Config VNeIDConfig { get;set; }
    public LLTPServiceSettings_LLTP_Config LLTPConfig { get; set; }
    public string UrlApiVNeID { get; set; }
    public string MaTinh { get; set; }
    public string CodeGet {get; set; } = "887fd254-2061-46a0-8ef9-254c486506bc";

}
public class LLTPServiceReq
{
    public string? CodeGet { get; set; }
}
public class LLTPServiceSettings_VNeID_Config
{
    public string Url { get; set; }
    public string SoLuongCapNhat { get; set; }
}
public class LLTPServiceSettings_LLTP_Config
{
    public string SoLuong { get; set; }
    public string UrlNhanTrangThai { get; set; }
}
