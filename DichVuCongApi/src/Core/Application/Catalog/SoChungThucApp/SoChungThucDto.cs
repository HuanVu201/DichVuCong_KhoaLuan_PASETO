using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp;
public class SoChungThucDto : IDto
{
    public Guid Id { get; set; }
    public string DonVi { get; set; }
    public string TenSo { get; set; }
    public string SoBatDau { get; set; }
    public string SoHienTai { get; set; }
    public string Catalog { get; set; }
    public DateTime NgayBatDau { get; set; }
    public DateTime NgayDongSo { get; set; }
    public string Loai { get; set; }
    public bool TrangThai { get; set; }
    public string GroupName { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class CountSoChungThucDto : IDto
{
   
    [JsonIgnore]
    public int TotalCount { get; set; }
}
