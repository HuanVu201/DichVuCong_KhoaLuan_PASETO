using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Queries;
public class SearchThuTucLienQuanQuery : PaginationFilter, IRequest<PaginationResponse<ThuTucLienQuanDto>>
{
    public Guid? ThuTucid { get; set; }
    public Guid? ThuTucLienQuanId { get; set; }
    public int? ThuTu { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
