using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;
public class HoSoChungThucDto : IDto
{
    public Guid Id { get; set; }
    public int So { get; set; }
    public DateTime NgayChungThuc { get; set; }
    public string ChuHoSo { get; set; }
    public string Ten { get; set; }
    public string TenGiayTo { get; set; }
    public string NguoiChungThuc { get; set; }
    public string MaHoSo { get; set; }
    public bool KyDienTuBanGiay { get; set; }
    public int SoBanGiay { get; set; }
    public int SoTien { get; set; }
    public int SoTienG { get; set; }
    public int SoTienDT { get; set; }
    public int SoTrang { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
