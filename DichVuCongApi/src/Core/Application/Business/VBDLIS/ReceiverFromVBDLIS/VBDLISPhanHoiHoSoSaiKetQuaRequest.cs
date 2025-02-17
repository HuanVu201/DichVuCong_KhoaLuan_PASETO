using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ReceiverFromVBDLIS;
public class VBDLISPhanHoiHoSoSaiKetQuaRequest
{
    public VBDLISPhanHoiHoSoSaiKetQuaRequest(string soBienNhan, string noiDung, List<VBDLISThongTinGiayToDinhKem>? danhSachGiayToDinhKem)
    {
        SoBienNhan = soBienNhan;
        NoiDung = noiDung;
        DanhSachGiayToDinhKem = danhSachGiayToDinhKem;
    }
    public string SoBienNhan { get; set; }
    public string NoiDung { get; set; }
    public List<VBDLISThongTinGiayToDinhKem>? DanhSachGiayToDinhKem { get; set; }
}
