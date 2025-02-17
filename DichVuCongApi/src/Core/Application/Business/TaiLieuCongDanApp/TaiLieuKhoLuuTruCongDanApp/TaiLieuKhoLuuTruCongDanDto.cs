using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp;
public class TaiLieuKhoLuuTruCongDanDto : IDto
{
    public Guid Id { get; set; }
    public string? TenGiayTo { get; set; }
    public string? DuongDan { get; set; }
    public double? DungLuong { get; set; }
    public string? Nguon { get; set; }
    public string? LoaiTaiLieu { get; set; }
    public string? Type { get; set; }
    public string? LoaiNhomGiayToCaNhanId { get; set; }
    public string? TenLoaiNhomGiayToCaNhan { get; set; }
    public DateTime? CreatedOn { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
