



using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp;


public class QuanLyVanBanDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType ID { get; set; }
    public string SoKyHieu { get; set; }
    public DateTime? NgaybanHanh { get; set; }
    public string LoaiVanBan { get; set; }
    public bool? CongKhai { get; set; }
    public int? ThuTu { get; set; }
    public string? FileDinhKem { get; set; }
    public string TrichYeu { get; set; }
    public string MaLinhVuc { get; set; }
    public string CoQuanBanHanh { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

