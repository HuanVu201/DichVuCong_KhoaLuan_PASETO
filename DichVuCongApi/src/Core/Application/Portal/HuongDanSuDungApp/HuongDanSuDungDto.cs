using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp;
public class HuongDanSuDungDto : IDto
{
    public DefaultIdType Id { get; set; }
    public int? ThuTu {  get; set; }
    public string? TenHuongDanSuDung {  get; set; }
    public string? NoiDungHuongDanSuDung {  get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
