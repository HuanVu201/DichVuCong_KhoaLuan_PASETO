

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;


public class GiaoDichThanhToanDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string HoSo { get; set; }
    public string YeuCauThanhToan { get; set; }
    public string MaThamChieu { get; set; }
    public int SoTien { get; set; }
    public string LoaiHinhThanhToan { get; set; }
    public string MaKenhThanhToan { get; set; }
    public string ThongTinGiaoDich { get; set; }
    public string Ip { get; set; }
    public string TKThuHuong { get; set; }
    public string TenTKThuHuong { get; set; }
    public string LoaiPhiLePhi { get; set; }
    public string MaPhiLePhi { get; set; }
    public string TenPhiLePhi { get; set; }
    public string MaDonVi { get; set; }

    public string TenDonVi { get; set; }
    public string MaThuTucDVCQG { get; set; }
    public string MaDVCThuTucDVCQuocGia { get; set; }

    public string TenThuTucDVCQG { get; set; }
    public string TenDVCThuTucDVCQuocGia { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string SoCMNDNguoiNop { get; set; }
    public string DiaChiNguoiNop { get; set; }
    public string TrangThai { get; set; }
    public DateTime ThoiGianGD { get; set; }
    public DateTime NgayTao { get; set; }
    public string MaGiaoDich { get; set; }
    public string MaDoiTac { get; set; }
    public string LoaiBanTin { get; set; }
    public string MaLoi { get; set; }
    public string MaNganHang { get; set; }
    public DateTime ThoiGianGDThanhCong { get; set; }
    public DateTime NgayCapNhatKetQua { get; set; }
    public string DuongDanBienLai { get; set; }
    public string BodyKetQua { get; set; }
    public string ResponseDvcPayment { get; set; }
    public string? NguoiNopTienBienLai { get; set; }
    public string? MaSoThueBienLai { get; set; }
    public string? DiaChiBienLai { get; set; }
    public string? SoTaiKhoanHoanPhi { get; set; }
    public string? TenTaiKhoanHoanPhi { get; set; }
    public string? TenNganHangHoanPhi { get; set; }
    public string? SoGiayToNguoiNopTienBienLai { get; set; }
    public string? EmailNguoiNopTienBienLai { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
