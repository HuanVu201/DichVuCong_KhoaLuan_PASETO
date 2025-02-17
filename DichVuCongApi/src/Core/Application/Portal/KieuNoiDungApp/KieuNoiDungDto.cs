using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp;

public class KieuNoiDungDto : KieuNoiDungBaseDto
{

}

public class KieuNoiDungBaseDto : IDto
{
    public Guid Id { get; set; }
    public string TenNoiDung { get; set; }
    public bool? ChoPhepNhapNoiDung { get; set; }
    public bool? ChoPhepNhapLoaiLienKet { get; set; }
    public bool? ChoPhepThemTinBai { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }

}
