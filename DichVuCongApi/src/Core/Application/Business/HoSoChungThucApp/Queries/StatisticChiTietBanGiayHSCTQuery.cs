using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Queries;
public class StatisticChiTietHSCTQuery : PaginationFilter, IRequest<PaginationResponse<HoSoChungThucDto>>
{
    public bool ? kySoDienTu { get; set; }
    public string? DonViId { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
}
