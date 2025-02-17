using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;
public class XuatPhieuTiepNhanNhieuHoSoCommand : IQuery<object>
{
    public List<string> Ids { get; set; }
    public string? TenGiayTo { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? Code { get; set; }
}
