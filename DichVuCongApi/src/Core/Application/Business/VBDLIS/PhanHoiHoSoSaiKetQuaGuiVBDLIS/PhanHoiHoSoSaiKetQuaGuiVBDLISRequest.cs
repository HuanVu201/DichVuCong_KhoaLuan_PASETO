using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.PhanHoiHoSoSaiKetQuaGuiVBDLIS;
public class PhanHoiHoSoSaiKetQuaGuiVBDLISRequest : IRequest<Result>
{
    public string MaHoSo { get; set; }
    public string NoiDung { get; set; }
    public string? DanhSachGiayToDinhKem { get; set; }
}
