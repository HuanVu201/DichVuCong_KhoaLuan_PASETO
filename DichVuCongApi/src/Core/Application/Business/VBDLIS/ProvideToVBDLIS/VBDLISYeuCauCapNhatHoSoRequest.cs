using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISYeuCauCapNhatHoSoRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string? SoBienNhan { get; set; }
    public string? MaCanBoXuLy { get; set; }

    public string? GhiChu { get; set; }
    public string? SecurityCode { get; set; }
}
