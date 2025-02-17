using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;
public class XuatPhieuHuongDanBoSungCommand : IQuery<object>
{
    public DefaultIdType Id { get; set; }
    public string? TenGiayTo { get; set; }
    public string? MaLoaiPhieu { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? Code { get; set; }
    //phieu-tiep-nhan-ho-so-va-hen-tra-ket-qua, ...
}
