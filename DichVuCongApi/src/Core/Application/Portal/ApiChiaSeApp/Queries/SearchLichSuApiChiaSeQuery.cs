using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;
public class SearchLichSuApiChiaSeQuery : PaginationFilter, IRequest<PaginationResponse<LichSuApiChiaSeResponse>>
{
    public string? Id { get; set; }
    public string? MaApiChiaSe { get; set; }
    public string? TenApiChiaSe { get; set; }
    public string? NoiDung { get; set; }
    public string? DuongDan { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public bool? Removed { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
