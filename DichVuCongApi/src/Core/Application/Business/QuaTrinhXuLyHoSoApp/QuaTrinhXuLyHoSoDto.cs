

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp;

public class QuaTrinhXuLyHoSoDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string TrangThai { get; set; }
    public DateTime? ThoiGian { get; set; }
    public string? NguoiGui { get; set; }
    public string? TenNguoiNhan { get; set; }
    public string? TenNguoiGui { get; set; }
    public int ThoiHanBuocXuLy { get; set; } = 0;
    public string? LoaiThoiHanBuocXuLy { get; set; }
    public DateTime? NgayHetHanBuocXuLy { get; set; }
    public string? TenDonViGui { get; set; }
    public string? NoiDung { get; set; }
    public string? DinhKem { get; set; }
    public string? ThaoTac { get; set; }
    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public string? PositionName { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
