using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp;
public class MaVanDonBuuDienDto
{
    public DefaultIdType? Id { get; set; }
    public string Ma { get; set; }
    public string? HoSo { get; set; }
    public string? TrangThai { get; set; }
    public DateTime? NgayYeuCau { get; set; }
    public DateTime? DeletedOn { get; set; }
    public DefaultIdType? HoSoId { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
