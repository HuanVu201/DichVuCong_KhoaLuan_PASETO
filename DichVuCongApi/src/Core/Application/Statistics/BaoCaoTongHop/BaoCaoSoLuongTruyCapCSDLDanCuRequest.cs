using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoSoLuongTruyCapCSDLDanCuRequest : BaseStatistisRequestModel, IRequest<BaoCaoTongHopResponse<BaoCaoSoLuongTruyCapCSDLDanCuElementResponse>>
{
    public string? Type { get; set; }
}