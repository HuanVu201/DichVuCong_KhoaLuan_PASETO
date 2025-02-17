using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.Services;
public class VBDLISCapNhatTrangThaiBoSungHoSoRequest
{
    public VBDLISCapNhatTrangThaiBoSungHoSoRequest(string soBienNhan, DateTime ngayHenTraMoi, List<VBDLISThongTinGiayToDinhKem>? danhSachGiayToBoSung)
    {
        SoBienNhan = soBienNhan;
        NgayHenTraMoi = ngayHenTraMoi;
        GhiChu = string.Empty;
        DanhSachGiayToBoSung = danhSachGiayToBoSung;
    }

    public string SoBienNhan { get; set; }
    public DateTime NgayHenTraMoi { get; set; }
    public string? GhiChu { get; set; }
    public List<VBDLISThongTinGiayToDinhKem>? DanhSachGiayToBoSung { get; set; }
}
