using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop06aCacCap;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTheoDonViMucDo34;
public class HoSoTheoDonViMucDo34Request : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<HoSoTheoDonViMucDo34ElementResponse>>
{
    public List<string>? Catalogs { get; set; }
    public bool? CoPhatSinhHoSo { get; set; }

}