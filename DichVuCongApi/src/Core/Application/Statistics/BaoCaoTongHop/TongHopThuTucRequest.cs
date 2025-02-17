using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class TongHopThuTucRequest : BaseStatistisRequestModel, IRequest<BaoCaoTongHopResponse<TongHopThuTucElementResponse>>
{
    public bool? CoPhatSinhHoSo { get; set; }
}
