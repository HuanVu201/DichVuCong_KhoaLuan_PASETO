using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp;
public class FilterLinhVucDto : IDto
{
    public Guid? Id { get; set; }
    public string TenTTHC { get; set; }
    public string MaTTHC { get; set; }
    public string MaLinhVucChinh { get; set; }
    public string LinhVucChinh { get; set; }
    public string MaNganh { get; set; }
    public string CoQuanThucHienChinh { get; set; }
    public string? CapThucHien { get; set; }
    public string MucDo { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
