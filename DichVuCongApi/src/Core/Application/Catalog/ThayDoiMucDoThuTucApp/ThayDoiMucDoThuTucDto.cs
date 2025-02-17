using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp;
public class ThayDoiMucDoThuTucDto : IDto
{
    public Guid Id { get; set; }
    public string ThuTuc  { get; set; }
    public string DonVi { get; set; }
    public DateTime  ThoiGian { get; set; }
    public string MucDoCu { get; set; }
    public string MucDoMoi { get; set; }
    public string NguoiCapNhat { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
