using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp;
public class ThuTucThietYeuDto : IDto
{
    public Guid Id { get; set; }
    public string? MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
    public string? LinkDVC { get; set; }
    public int? SoThuTu { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}