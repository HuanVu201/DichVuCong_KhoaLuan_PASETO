using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
/// <summary>
/// các thuộc tính đang phải trùng với TiepNhanHoSoEvent
/// </summary>
public class TiepNhanHoSoTrucTuyenEmailMapper : HoSo
{
    public string NgayThangNam { get; set; }
    public string HoTenChuHoSo { get; set; }
    public string ThoiHanXuLy { get; set; }
    public string GioNhan { get; set; }
    public string NgayNhan { get; set; }
    public string NgayGioHenTra { get; set; }
    public string TenNguoiNhanHoSo { get; set; }
    public string TenDonVi { get; set; }
    public string TenDonViCha { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string TenDiaDanh { get; set; }
    public string TenTTHC { get; set; }
    public string LinkTraCuu { get; set; }
    public string LinkThanhToan { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
}
