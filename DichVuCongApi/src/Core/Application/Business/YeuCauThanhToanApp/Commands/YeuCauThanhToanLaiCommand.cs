using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class YeuCauThanhToanLaiCommand : ICommand
{
    public DefaultIdType Id { get; set; }
    public int Phi { get; set; }
    public int LePhi { get; set; }
}
