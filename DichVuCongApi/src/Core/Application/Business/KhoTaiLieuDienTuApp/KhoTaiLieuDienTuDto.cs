using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp;
public class KhoTaiLieuDienTuDto : IDto
{
    public Guid Id { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? TenKhoTaiLieu { get; set; }
    public string? MoTa { get; set; }
    public double? DungLuong { get; set; }
    public string? SoLuong { get; set; }
   
    [JsonIgnore]
    public int TotalCount { get; set; }
}
