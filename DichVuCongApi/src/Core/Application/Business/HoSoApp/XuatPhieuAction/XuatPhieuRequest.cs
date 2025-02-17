using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction;
public class XuatPhieuRequest
{
    public List<string> Ids { get; set; }
    public string? TenGiayTo { get; set; }
    public string? MaLoaiPhieu { get; set; }
    public string? LoaiPhieu { get; set; }
    //phieu-tiep-nhan-ho-so-va-hen-tra-ket-qua, ...

}
