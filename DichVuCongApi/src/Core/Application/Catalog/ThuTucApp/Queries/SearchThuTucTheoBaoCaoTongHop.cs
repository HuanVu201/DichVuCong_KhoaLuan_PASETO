using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class SearchThuTucTheoBaoCaoTongHop : PaginationFilter, IRequest<PaginationResponse<ThuTucDto>>
{
    public string? TieuChi { get; set; }
    public string? GroupCode { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? Catalog { get; set; }
    public bool? CoPhatSinhHoSo { get; set; }
}
