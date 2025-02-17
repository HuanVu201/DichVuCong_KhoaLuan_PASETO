using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class ThongKeHSLienThongDto
{
    public string GroupName { get; set; }
    public string GroupCode { get; set; }
    public string GroupOrder { get; set; }
    public string MaDinhDanh { get; set; }
    public string SoLuongHoSoKT { get; set; }
    public string SoLuongHoSoKS { get; set; }
    public string TongSoLuongHoSo { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
