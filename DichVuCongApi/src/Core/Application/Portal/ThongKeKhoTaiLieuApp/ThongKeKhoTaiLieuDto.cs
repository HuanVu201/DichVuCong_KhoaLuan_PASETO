using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp;
public class ThongKeKhoTaiLieuDto
{
    public string SoDinhDanh { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string PhoneNumber { get; set; }
    public string SoLuongKho { get; set; }
    public string SoLuongGiayTo { get; set; }
    public double TongDungLuong { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
