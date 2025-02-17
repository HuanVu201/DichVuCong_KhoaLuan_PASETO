using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoSo06bRequest : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<BaoCaoSo06ElementResponse>>
{

    public string? MaDonVi { get; set; }
    public string? MaLinhVucChinh { get; set; } 
}
