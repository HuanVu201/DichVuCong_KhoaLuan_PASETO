using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp;
public class StatisticLogCSDLDanCuDoanhNghiepDto : IDto
{
 

    public int SoLuong { get; set; }
    public string TaiKhoan { get; set; }
    public string DonViId { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }

}
