using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Commands;
public class AddThuTucThietYeuCommand : ICommand<Guid>
{
    public string MaTTHC { get; set; }
    public string TenTTHC { get; set; }
    public string LinkDVC { get; set; }
    public int SoThuTu { get; set; }

}