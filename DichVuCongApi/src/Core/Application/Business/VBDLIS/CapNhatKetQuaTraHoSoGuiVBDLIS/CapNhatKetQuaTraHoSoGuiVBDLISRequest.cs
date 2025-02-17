using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.CapNhatKetQuaTraHoSoGuiVBDLIS;
public class CapNhatKetQuaTraHoSoGuiVBDLISRequest : IRequest<Result>
{
    public string MaHoSo { get; set; }
    public DateTime NgayTra { get; set; }
}
