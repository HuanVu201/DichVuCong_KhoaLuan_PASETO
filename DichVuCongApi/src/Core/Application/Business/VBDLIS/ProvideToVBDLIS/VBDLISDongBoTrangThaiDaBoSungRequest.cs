using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoTrangThaiDaBoSungRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string SoBienNhan { get; set; }
    public DateTime NgayNhanBoSung { get; set; }
    public DateTime NgayHenTraMoi { get; set; }
    public string? GhiChu { get; set; }
    public VBDLISThongTinTapTinDinhKem? TapTin { get; set; }
    public string? SecurityCode { get; set; }
}
