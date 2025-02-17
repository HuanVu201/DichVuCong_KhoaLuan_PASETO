using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThanhtoan;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThuTuc;
public class TongHopThuTucPhatSinhHoSoRequest : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<TongHopThuTucPhatSinhHoSoElementResponse>>
{
    public bool? CoPhatSinhHoSo { get; set; }
    public DateTime? TiepNhanTuNgay { get; set; }
    public DateTime? TiepNhanDenNgay { get; set; }
   
}