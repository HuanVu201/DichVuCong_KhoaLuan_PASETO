using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiVNPT;
public class InitBienLaiDienTuVnptRequest
{
    public string Ma { get; set; } = string.Empty;
    public string MaHoSo { get;set; } = string.Empty;
    public string ChuHoSo { get; set; } = string.Empty;
    public string HinhThucThanhToan { get; set; } = string.Empty;
    public int ThanhTien { get;set; }
    public string DiaChiChuHoSo { get; set; } = string.Empty;
    public string MaSoThueBienLai { get; set; } = string.Empty;
    public string EmailNguoiNopTienBienLai { get; set; } = string.Empty;
    public string MaTTHC { get; set; } = string.Empty;
    public string TenTTTHC { get; set; } = string.Empty;
    public string LoaiPhi { get; set; } = string.Empty;
    public string LoaiPhiText { get; set; } = string.Empty;
    public DateTime NgayThuPhi { get; set; }
    public string? DonViThuPhi { get; set; } = string.Empty;
    public string? CauHinhBienLaiDienTu { get; set; } = string.Empty;

}
