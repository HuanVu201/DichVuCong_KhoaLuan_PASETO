using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp;
public class DiaBanDto
{
    public Guid? Id { get; set; }
    public string TenDiaBan { get; set; }
    public string MaDiaBan { get; set; }
    public string MaTinh { get; set; }
    public string MaHuyen { get; set; }
    public string MaXa { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool Active { get; set; } = true;
    [JsonIgnore]
    public int TotalCount { get; set; }
}
