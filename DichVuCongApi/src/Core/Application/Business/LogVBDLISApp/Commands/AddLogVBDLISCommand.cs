using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
public class AddLogVBDLISCommand : ICommand<DefaultIdType>
{
    public string? api { get; set; }
    public string? maHoSo { get; set; }
    public string? body { get; set; }
    public string? response { get; set; }
}
