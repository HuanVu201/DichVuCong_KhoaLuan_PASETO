using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Queries;
public class SearchLoaiNhomGiayToCaNhanQuery : PaginationFilter, IRequest<PaginationResponse<LoaiNhomGiayToCaNhanDto>>
{
    public string? Ten { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? GhiChu { get; set; }
    public string? Loai { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
