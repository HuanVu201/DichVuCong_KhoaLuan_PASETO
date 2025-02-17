using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class PortalGetDVCNoiBatQuery : PaginationFilter, IRequest<List<ThuTucDto>>
{
    public bool? LaTieuBieu { get; set; }
    public bool? SuDung { get; set; }
    public bool? Removed { get; set; } = false;
}
