using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp;
public class FilterThuTucThuocLoaiDto : IDto
{
    public Guid? Id { get; set; }
    public string ThuTucID { get; set; }
    public string ThuTu { get; set; }
    public string LoaiThuTucId { get; set; }

    public string TenThutuc { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
