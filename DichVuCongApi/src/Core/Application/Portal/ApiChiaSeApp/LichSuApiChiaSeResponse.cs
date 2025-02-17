using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp;
public class LichSuApiChiaSeResponse : IDto
{
    public DefaultIdType Id { get; set; }
    public string? MaApiChiaSe { get; set; }
    public string? TenApiChiaSe { get; set; }
    public string? NoiDung { get; set; }
    public int? GioiHan { get; set; }
    public string? DuongDan { get; set; }
    public string? NgayGoi { get; set; }
    public int? SoLuotGoiTrongNgay { get; set; }
    public string? IP { get; set; }
    public DateTime? CreatedOn { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
