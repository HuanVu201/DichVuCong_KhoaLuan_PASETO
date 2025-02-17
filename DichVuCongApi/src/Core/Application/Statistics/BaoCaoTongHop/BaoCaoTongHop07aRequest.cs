using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoTongHop07aRequest : BaseStatistisRequestModel, IRequest<BaoCaoTongHopResponse<BaoCaoTongHop07aElementResponse>>
{
    public string? MaDonVi { get; set; }
    public string? MaDinhDanh { get; set; }
}