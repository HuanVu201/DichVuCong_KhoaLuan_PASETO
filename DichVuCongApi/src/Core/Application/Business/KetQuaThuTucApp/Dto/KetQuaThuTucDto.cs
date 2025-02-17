using System.Text.Json.Serialization;
namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Dto;
public class KetQuaThuTucDto: IDto
{
    public string? MaNhanDienOCR { get; set; }
    public Guid? Id { get; set; }
    public string? MaKetQua { get; set; }
    public string? TenKetQua { get; set; }
    public string? TenTep { get; set; }
    public string? Url { get; set; }
    public string? EFormKetQua { get; set; }
    public string? MaTTHC { get; set; }
    public string? LoaiThoiHan { get; set; }
    public string? ThoiHanMacDinh { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
