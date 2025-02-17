using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class HoSoPublicDto : IDto
{
    public string MaHoSo { get; set; }
    public string TenThuTuc { get; set; }
    public string TrangThaiHoSo { get; set; }
    public string ChuHoSo { get; set; }
    public string NgayTiepNhan { get; set; }
    public string NgayHenTra { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
