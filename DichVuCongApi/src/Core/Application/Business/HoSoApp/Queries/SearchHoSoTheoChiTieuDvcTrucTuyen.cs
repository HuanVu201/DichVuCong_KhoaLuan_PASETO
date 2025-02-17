using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTheoChiTieuDvcTrucTuyen : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? TieuChi { get; set; }
    public string? Catalog { get; set; }
    public string? MaDonVi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }

}
