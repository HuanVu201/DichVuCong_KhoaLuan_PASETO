using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISCungCapSoBienNhanRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string SoBienNhan { get; set; }
    public int TinhId { get; set; }
    public int HuyenId { get; set; }
    public int XaId { get; set; }
    public string NguoiTiepNhan { get; set; }
    public DateTime NgayTiepNhan { get; set; }
    public DateTime NgayHenTra { get; set; }
    public string? DiaChiTaiSan { get; set; }
    public VBDLISThongTinNguoiNop ThongTinNguoiNopDon { get; set; }
    public VBDLISThongTinThuaDat? ThongTinThuaDat { get; set; }
    public VBDLISThongTinQuyTrinh ThongTinQuyTrinh { get; set; }
    public List<VBDLISThongTinTapTinDinhKem> DanhSachGiayToDinhKem { get; set; }
    public string? SecurityCode { get; set; }
}
