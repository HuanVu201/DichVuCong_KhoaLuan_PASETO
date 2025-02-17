using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;
public class SearchGiayToHoSoQuery : PaginationFilter, IRequest<PaginationResponse<GiayToHoSoDto>>
{
    public string? MaHoSo { get; set; }
    public string? LoaiGiayTo { get; set; }
    public string? MaGiayTo { get; set; }
    public bool? SuDung { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
