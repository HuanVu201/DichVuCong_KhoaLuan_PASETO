using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
public class HoSoTrucTuyenCapHuyenRequest : BaseStatistisRequestModel, IRequest<TiepNhanHoSoTrucTuyenResponse>
{
    public string? Catalog { get; set; }
    public List<string>? Catalogs { get; set; }
}
