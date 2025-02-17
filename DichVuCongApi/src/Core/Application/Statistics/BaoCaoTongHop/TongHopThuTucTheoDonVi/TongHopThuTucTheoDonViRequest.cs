using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class TongHopThuTucTheoDonViRequest : BaseStatistisRequestModel, IRequest<BaoCaoTongHopResponse<TongHopThuTucElementResponse>>
{
    public bool? CoPhatSinhHoSo { get; set; }
    public bool? SuDung { get; set; }
    public string? MaTTHC { get; set; }
}
