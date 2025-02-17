using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop06aCacCap;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTrucTuyenTheoThuTuc;
public class HoSoTrucTuyenTheoThuTucRequest : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<HoSoTrucTuyenTheoThuTucElementResponse>>
{
    public List<string>? Catalogs { get; set; }
    public bool? CoPhatSinhHoSo { get; set; }
    public string? LinhVucId { get; set; }

}