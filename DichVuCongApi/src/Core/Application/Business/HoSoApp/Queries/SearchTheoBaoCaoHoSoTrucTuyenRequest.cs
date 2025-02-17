using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchTheoBaoCaoHoSoTrucTuyenRequest : BaseStatistisRequestModel, IRequest<PaginationResponse<HoSoDto>>
{
    public List<string>? Catalogs { get; set; }
    public bool? LaHoSoTrucTuyen { get; set; } = false;
    public string? TieuChi { get; set; }
    public string? MaTTHC { get; set; }

}
