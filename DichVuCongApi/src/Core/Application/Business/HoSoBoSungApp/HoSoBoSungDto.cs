using System.Text.Json.Serialization;
namespace TD.DichVuCongApi.Application.Business.HoSoBoSungApp;
public class HoSoBoSungDto : IDto
{
    public DateTime? NgayHenTraMoi { get; set; }
    public DateTime? NgayBoSung { get; set; }
    public DateTime? NgayHenTraTruoc { get; set; }
    public string? NguoiYeuCauBoSung { get; set; }
    public string? TrangThaiBoSung { get; set; }
    public string? NguoiTiepNhanBoSung { get; set; }
    public string? NguoiTiepNhanBoSungFullName { get; set; }
    public string? NguoiYeuCauBoSungFullName { get; set; }
    public string? DinhKemNoiDungBoSung { get; set; }

    public Guid? Id { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
