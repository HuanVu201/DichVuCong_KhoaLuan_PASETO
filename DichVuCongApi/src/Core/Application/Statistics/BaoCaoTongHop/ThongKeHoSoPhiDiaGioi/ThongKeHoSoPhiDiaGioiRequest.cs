using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeHoSoPhiDiaGioi;
public class ThongKeHoSoPhiDiaGioiRequest : PaginationFilter, IRequest<PaginationResponse<ThongKeHoSoPhiDiaGioiResponse>>
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? DonViPhiDiaGioi { get; set; }
    public string? DonViId { get; set; }
    public string? MaTTHC { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}
