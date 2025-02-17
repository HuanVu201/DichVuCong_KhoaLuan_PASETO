using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp;
public class LoaiNhomGiayToCaNhanDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? Ten { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? GhiChu { get; set; }
    public string? Loai { get; set; }
    public DateTime? CreatedOn { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
