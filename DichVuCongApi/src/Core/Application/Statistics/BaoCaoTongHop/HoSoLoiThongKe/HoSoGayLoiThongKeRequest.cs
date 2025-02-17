using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoLoiThongKe;
public class HoSoGayLoiThongKeRequest : IRequest<Result<HoSoGayLoiThongKeResponse>>
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
}
