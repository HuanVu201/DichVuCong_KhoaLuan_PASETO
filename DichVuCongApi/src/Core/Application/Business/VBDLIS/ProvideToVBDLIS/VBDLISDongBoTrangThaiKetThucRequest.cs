using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoTrangThaiKetThucRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string SoBienNhan { get; set; }
    public DateTime NgayKetThuc { get; set; }
    public string MaCanBoXuLy { get; set; }
    public int TrangThaiKetThuc { get; set; }
    public string? GhiChu { get; set; }
    public List<VBDLISThongTinTapTinDinhKem>? DanhSachGiayToKetQua { get; set; }
    public string? SecurityCode { get; set; }
}
