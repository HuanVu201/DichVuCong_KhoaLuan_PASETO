using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
public class SearchTruongHopThuTucTheoDonViQuery : PaginationFilter, IRequest<PaginationResponse<TruongHopThuTucDto>>
{
    public string? ThuTucId { get; set; }
    public string? DonViTiepNhan { get; set; }
    public bool? Removed { get; set; } = false;

    [Newtonsoft.Json.JsonIgnore]

    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 50;
    public new int PageNumber { get; set; } = 1;
}
