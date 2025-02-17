using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp;
public class FilterThuTucDto : IDto
{
    public Guid Id { get; set; }
    public string TenLinhVuc { get; set; }
    public string MaLinhVuc { get; set; }
    public string MaNganh { get; set; }
    public string TenNganh { get; set; }
    public string CapThucHien { get; set; }
    public string SoLuongThuTuc { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
