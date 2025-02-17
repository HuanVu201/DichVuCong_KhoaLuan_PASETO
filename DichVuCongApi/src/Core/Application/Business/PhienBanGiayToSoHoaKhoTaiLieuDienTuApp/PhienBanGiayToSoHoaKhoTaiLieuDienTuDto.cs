using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp;
public class PhienBanGiayToSoHoaKhoTaiLieuDienTuDto : IDto
{
    public Guid Id { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public string? MaHoSo { get; set; }
    public string? DinhKem { get; set; }
    public string? MaGiayTo { get; set; }
    public double? DungLuong { get; set; }
    public string? TenKhoTaiLieu { get; set; }
    public DateTime? CreatedOn { get; set; }
    public DateTime? LastModifiedOn { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
