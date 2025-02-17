using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp;
public class KenhTinDto : KenhTinBaseDto
{
    public Nullable<Guid> MaKenhTinCha { get; set; }
    public string? TenKenhTinCha { get; set; }
    public string? ImageUrlKenhTinCha { get; set; }
    //public string TenKenhTinCha { get; set; }
    //public KenhTinBaseDto? KenhTincha { get; set; }
    public int ThuTu { get; set; }
    public string? TomTat { get; set; }
    public KieuNoiDungBaseDto KieuNoiDung { get; set; }
    public string TenNoiDung { get; set; }
    public string LoaiMoLienKet { get; set; }
    public string LienKetNgoai { get; set; }
    public bool? HienThiMenuChinh { get; set; }
    public bool? HienThiMenuDoc { get; set; }
    public bool? HienThiMenuPhu { get; set; }
}

public class KenhTinBaseDto : IDto
{
    public Guid Id { get; set; }
    public string TenKenhTin { get; set; }
    public string ImageUrl { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }

}