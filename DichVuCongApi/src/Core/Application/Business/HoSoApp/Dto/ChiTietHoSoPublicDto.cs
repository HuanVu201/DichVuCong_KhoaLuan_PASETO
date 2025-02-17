using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class ChiTietHoSoPublicDto : IDto
{
    public string? TenTTHC { get; set; }
    public string? KieuTiepNhan { get; set; }
    public string? TenTruongHop { get; set; }
    public string? TrangThaiHoSo { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public DateTime? NgayKetThucHoSo { get; set; }
    public DateTime? NgayTraKetQua { get; set; }
    public List<QuaTrinhXuLyHoSoPublicDto>? ThongTinTienTrinh { get; set; }
   

}

public class QuaTrinhXuLyHoSoPublicDto
{
    public string? BuocXuLy { get; set; }
    public string? DonViXuLy { get; set; }
    public string? NguoiXuLy { get; set; }
    public DateTime? ThoiGian { get; set; }
    public string? YKien { get; set; }
}
