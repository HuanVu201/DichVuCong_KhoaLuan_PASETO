using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
public class YeuCauThanhToanDto : IDto
{
    // public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public DefaultIdType? HoSoId { get; set; }
    public string MaHoSo { get; set; }
    public string Ma { get; set; }
    public int SoTien { get; set; }
    public int Phi { get; set; }
    public int LePhi { get; set; }

    public string? HinhThucThu { get; set; }
    public string TrangThai { get; set; }
    public string? TenNguoiYeuCau { get; set; }
    public string? TenDonVi { get; set; }
    public string? TenDonViThu { get; set; }
    public string? TenNguoiThuPhi { get; set; }
    public string? HinhThucThanhToan { get; set; }
    public string? TenNguoiNhanHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? KenhThucHien { get; set; }
    public string? NguoiNopTienBienLai { get; set; }
    public string? LoaiBienLaiThanhToan { get; set; }
    public string? MaSoThueBienLai { get; set; }
    public string? DiaChiBienLai { get; set; }
    public string? TenPhiBienLai { get; set; }
    public string? TenLePhiBienLai { get; set; }
    public string? LyDoHuy { get; set; }
    public string? LyDoHoanPhi { get; set; }
    public string? TenNganHangHoanPhi { get; set; }
    public string? SoTaiKhoanHoanPhi { get; set; }
    public string? TenTaiKhoanHoanPhi { get; set; }
    public string? MauSoBienLai { get; set; }
    public string? KyHieuBienLai { get; set; }
    public string? SoBienLaiPhi { get; set; }
    public string? SoBienLaiLePhi { get; set; }
    public string? TenTTHC { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime? NgayThuPhi { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayYeuCau { get; set; }
    public DateTime? NgayHoanPhi { get; set; }
    public string? MaThamChieuGiaoDich { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
