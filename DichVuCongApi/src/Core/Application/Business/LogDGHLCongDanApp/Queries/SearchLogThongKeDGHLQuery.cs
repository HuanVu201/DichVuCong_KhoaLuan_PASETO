using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp.Queries;
public class SearchLogThongKeDGHLQuery : PaginationFilter, IRequest<PaginationResponse<LogThongKeDGHLCongDanDto>>
{
    public string? MaHoSo { get; set; }
    public string? DonVi { get; set; }
    public DateTime? NgayTao { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
