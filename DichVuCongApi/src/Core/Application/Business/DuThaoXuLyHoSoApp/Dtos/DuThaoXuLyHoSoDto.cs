using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Dtos;
public class DuThaoXuLyHoSoDto : IDto
{
    public Guid HoSoId { get; set; }
    public string KenhThucHien { get; set; }
    public string NgayNopHoSo { get; set; }
    public string NgayHenTra { get; set; }
    public string TrangThaiHoSoId { get; set; }
    public string DanhGia { get; set; }
    public string ChuHoSo { get; set; }
    public string SoDienThoaiChuHoSo { get; set; }
    public string EmailChuHoSo { get; set; }
    public string SoGiayToChuHoSo { get; set; }
    public Guid Id { get; set; }
    public string MaHoSo { get; set; }
    public string TenTTHC { get; set; }
    public string Loai { get; set; }
    public string NguoiXuLy { get; set; }
    public string TrangThai { get; set; }
    public string TrangThaiLienThongQLVB { get; set; }
    public string FileDinhKem { get; set; }
    public string TrichYeu { get; set; }
    public string TenNguoiXuLy { get; set; }
    public string TaiKhoanLanhDaoKy { get; set; }
    public string TenLanhDaoKy { get; set; }
    public DateTime? NgayHenTraMoi { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
