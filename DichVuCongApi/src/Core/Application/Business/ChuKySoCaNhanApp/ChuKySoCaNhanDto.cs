using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp;
public class ChuKySoCaNhanDto : IDto
{
    public Guid Id { get; set; }
    public string? UserName { get; set; }
    public string? HinhAnh { get; set; }
    public string? MoTa { get; set; }
    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianThayDoi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
