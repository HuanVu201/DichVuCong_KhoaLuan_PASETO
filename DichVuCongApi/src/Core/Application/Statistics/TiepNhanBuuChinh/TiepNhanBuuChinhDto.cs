using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Statistics.TiepNhanBuuChinh;
public class TiepNhanBuuChinhDto
{
    public string GroupName { get; set; }
    public string GroupCode { get; set; }
    public int CountTiepNhanQuaBuuChinh { get; set; }   
    public int CountBuuDienDaChuyenTraKQ { get; set; }   
    public int CountDangKyQuaKQBuuDien { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
