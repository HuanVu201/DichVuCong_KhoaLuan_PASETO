using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenPhiDiaGioi : ICommand
{
    public List<DefaultIdType> Ids { get; set; }
    public string DonViId { get; set; }
}
