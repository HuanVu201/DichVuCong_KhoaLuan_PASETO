using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp;
public class DanhMucChungDto : IDto
{
    public Guid? Id { get; set; }
    public string TenDanhMuc { get; set; }
    public string Code { get; set; }
    public string ParentCode { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool Active { get; set; } = true;
    public string Type { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

