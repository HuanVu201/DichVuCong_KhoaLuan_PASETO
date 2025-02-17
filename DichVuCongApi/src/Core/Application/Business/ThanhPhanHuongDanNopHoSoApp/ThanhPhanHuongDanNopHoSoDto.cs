

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp;


public class ThanhPhanHuongDanNopHoSoDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string HoSo { get; set; }
    public bool NhanBanGiay { get; set; }
    public int SoBanChinh { get; set; }
    public int SoBanSao { get; set; }
    public string? GhiChu { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
