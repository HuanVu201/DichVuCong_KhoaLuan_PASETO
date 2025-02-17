using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Queries;
public class SearchTaiLieuGiayToCaNhanQuery : PaginationFilter, IRequest<PaginationResponse<TaiLieuGiayToCaNhanDto>>
{
    public string? TenGiayTo { get; set; }
    public string? DuongDan { get; set; }
    public string? Type { get; set; }
    public string? LoaiNhomGiayToCaNhanId { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}