using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.TTHC;
public class ThongKeTTHCRequest : IRequest<QuyetDinh766Response<ThongKeTTHCElementResponse>>
{
    public string? Catalog { get; set; }
    public string? GroupCode { get; set; }
    public string? MaLinhVuc { get; set; }
}
