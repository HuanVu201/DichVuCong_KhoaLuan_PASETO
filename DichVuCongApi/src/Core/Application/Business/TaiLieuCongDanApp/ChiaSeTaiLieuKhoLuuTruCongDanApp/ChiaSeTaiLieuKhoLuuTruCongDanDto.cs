using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp;
public class ChiaSeTaiLieuKhoLuuTruCongDanDto : IDto
{
    public DefaultIdType Id { get; set; }
    public DefaultIdType TaiLieuLuuTruId { get; set; }
    public string? TenNguoiChiaSe { get; set; }
    public DateTime CreatedOn { get; set; }
    public string? TenGiayTo { get; set; }
    public string? DuongDan { get; set; }
    public double? DungLuong { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
