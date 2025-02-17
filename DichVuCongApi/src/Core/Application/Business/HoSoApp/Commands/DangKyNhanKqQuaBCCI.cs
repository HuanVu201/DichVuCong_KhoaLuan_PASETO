using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DangKyNhanKqQuaBCCI : ICommand
{
    public DefaultIdType Id { get; set; }
    public string DangKyNhanKqQuaBCCIData { get; set; }
    public string? Loai { get; set; }
}
