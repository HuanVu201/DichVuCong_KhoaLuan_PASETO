using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Queries;
public class SearchThuTucThietYeuPortalQuery : PaginationFilter, IRequest<PaginationResponse<ThuTucThietYeuDto>>
{
    public string? MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
    public string? LinkDVC { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
