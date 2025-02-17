using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp;
public class GiayToSoHoaChiaSeDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? MaDinhDanhChiaSe { get; set; }
    public string? TenNguoiChiaSe { get; set; }
    public string? Ten { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? Ma { get; set; }
    public DateTime? ThoiGianSoHoa { get; set; }
    public DateTime? ThoiHanHieuLuc { get; set; }
    public string? DinhKem { get; set; }
    public string? FullName { get; set; }
    public string? GroupName { get; set; }
    public string? LoaiSoHoa { get; set; }
    public double? DungLuong { get; set; }
    public DateTime? ThoiGianChiaSe { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
