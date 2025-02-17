using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp;
public class LogCSDLDanCuDoanhNghiepDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string TaiKhoan { get; set; }
    public DateTime ThoiGian { get; set; }
    public string DonViId { get; set; }

    public string GroupName { get; set; }
    public string Loai { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
