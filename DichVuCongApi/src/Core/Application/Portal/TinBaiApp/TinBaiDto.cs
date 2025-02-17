using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp;
public class TinBaiDto : IDto
{
    public Guid Id { get; set; }
    public string TieuDe { get; set; }
    //public string AnhDaiDien { get; set; }
    public DateTime NgayBanHanh { get; set; }
    public string TrichYeu { get; set; }
    public string TenTrangThai { get; set; }
    public string AnhDaiDien { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
