using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp;
public class TaiLieuGiayToCaNhanDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? TenGiayTo { get; set; }
    public string? DuongDan { get; set; }
    public string? Type { get; set; }
    public string? LoaiNhomGiayToCaNhanId { get; set; }
    public string? LoaiTaiLieu { get; set; }
    public DateTime? CreatedOn { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}