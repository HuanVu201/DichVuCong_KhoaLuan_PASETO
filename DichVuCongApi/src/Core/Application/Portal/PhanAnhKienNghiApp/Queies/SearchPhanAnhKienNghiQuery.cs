using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Portal.HoiDapApp;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Queies;
public class SearchPhanAnhKienNghiQuery : PaginationFilter, IRequest<PaginationResponse<PhanAnhKienNghiDto>>
{
    public string? TieuDe { get; set; }
    public string? NoiDung { get; set; }
    public string? CongKhai { get; set; }
    public string? TrangThai { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
