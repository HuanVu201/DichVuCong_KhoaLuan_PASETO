using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
public class GetCoordinatesQuery : IRequest<List<GetCoordinatesDto>>
{
    public string? MaDinhDanh { get; set; }
    public bool? GetChild { get; set; } = false;
    public string? LoaiThoiGian { get; set; }
    public int? Ky { get; set; }
    public int? Nam { get; set; }
}

public class GetCoordinatesDto
{
    public DefaultIdType ID { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? GroupName { get; set; }
    public string? Catalog { get; set; }
    public double? Diem766 { get; set; }
    public string? Name { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? Ky { get; set; }
    public string? Nam { get; set; }
    public string? Coordinates { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
