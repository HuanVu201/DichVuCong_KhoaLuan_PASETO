using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeHoSoPhiDiaGioi;
public class ThongKeHoSoPhiDiaGioiResponse
{
    public DefaultIdType Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public DateTime? NgayKetThucXuLy { get; set; }
    public string? TenLinhVuc { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
