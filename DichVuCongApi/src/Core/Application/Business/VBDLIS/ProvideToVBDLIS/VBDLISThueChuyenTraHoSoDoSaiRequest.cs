using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISThueChuyenTraHoSoDoSaiRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string SoBienNhan { get; set; }
    public string? GhiChu { get; set; }
    public string? SecurityCode { get; set; }
}
