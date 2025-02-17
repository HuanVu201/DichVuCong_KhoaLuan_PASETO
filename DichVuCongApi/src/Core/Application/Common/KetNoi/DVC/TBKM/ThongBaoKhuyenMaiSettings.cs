using TD.DichVuCongApi.Application.Common.KetNoi.Classes;

namespace TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
public class ThongBaoKhuyenMaiSettings
{
    public string MaTTHC_ThongBaoKhuyenMai { get; set; }
    public string MaTTHC_BoSungThongBaoKhuyenMai { get; set; }
    public string MaDonVi { get; set; }
    public string Url_ConnectApiDVC { get; set; }
    public BaseTokenSettings? Token { get; set; }
}

public class TBKM_Config
{
    public ThongBaoKhuyenMaiSettings SoCongThuong { get; set; }
}
