using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
public class SoLieuBaoCaoDto : IDto
{
    public Guid Id { get; set; }
    public string? LoaiThoiGian { get; set; }
    public int? Ky { get; set; }
    public int? Nam { get; set; }
    public string? LoaiThongKe { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? SoLieu { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
