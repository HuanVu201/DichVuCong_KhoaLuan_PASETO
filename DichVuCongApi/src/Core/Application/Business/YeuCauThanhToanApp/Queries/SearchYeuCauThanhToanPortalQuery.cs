using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
public class SearchYeuCauThanhToanPortalQuery : PaginationFilter, IRequest<PaginationResponse<YeuCauThanhToanPortalDto>>
{
    public string? MaHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    [JsonIgnore]
    public bool? Removed { get; set; } = false;
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}
