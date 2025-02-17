using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
public class BaoCao01Dto : IDto
{
    public DefaultIdType Id { get; set; }
    public string MaHoSo { get; set; }
    public string GroupName { get; set; }
    public string DonVi { get; set; }
    public string ChiSo1 { get; set; }
    public string ChiSo2 { get; set; }
    public string ChiSo3 { get; set; }
    public string ChiSo4 { get; set; }
    public string ChiSo6 { get; set; }
    public string ChiSo7 { get; set; }
    public string ChiSo10 { get; set; }
    public string ChiSo11 { get; set; }
    public string MucDoHL_MucDoKHL_MucDoRHL { get; set; }
    public string TongDiem { get; set; }
    public string XepLoai { get; set; }
    public string? MucDoKHL { get;  set; }
    public string? MucDoHL { get;  set; }
    public string? MucDoRHL { get;  set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
