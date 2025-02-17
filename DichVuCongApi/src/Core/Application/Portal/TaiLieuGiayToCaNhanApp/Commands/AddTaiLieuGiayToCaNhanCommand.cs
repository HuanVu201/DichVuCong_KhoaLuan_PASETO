using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Commands;
public class AddTaiLieuGiayToCaNhanCommand : ICommand<DefaultIdType>
{
    public string TenGiayTo { get; set; }
    public string DuongDan { get; set; }
    public string Type { get; set; }
    public string LoaiNhomGiayToCaNhanId { get; set; }
}