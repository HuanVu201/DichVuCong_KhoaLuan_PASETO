using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class HoSoTheoTrangThaiDto : IDto
{
    // public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string? KenhThucHien { get; set; }
    public string? NgayTiepNhan { get; set; }
    public string? NgayHenTra { get; set; }
    public string? MaHoSo { get; set; }
    public string? DonViId { get; set; }
    public string? ChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
    public string? NgayTra { get; set; }
    public string? CreatedOn { get; set; }
    public string? LinhVucChinh { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? TenTrangThaiHoSo { get; set; }
    public string? GroupName { get; set; }
    public string? NgayKetThucXuLy { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? TenNguoiDangXuLy { get; set; }
    public string? OfGroupName { get; set; }
    public string? Catalog { get; set; }
    public bool? DaXuLy { get; set; }
    public List<QuaTrinhXuLyHoSoDto> NguoiXuLyQuaHans { get; set; } = new List<QuaTrinhXuLyHoSoDto>();

    [JsonIgnore]
    public int TotalCount { get; set; }
}
