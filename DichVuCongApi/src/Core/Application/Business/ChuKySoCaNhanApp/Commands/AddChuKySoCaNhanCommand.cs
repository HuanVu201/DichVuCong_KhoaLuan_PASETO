using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Commands;
public class AddChuKySoCaNhanCommand : ICommand<Guid>
{
    public string UserName { get; set; }
    public string HinhAnh { get; set; }
    public string? MoTa {  get; set; }
}