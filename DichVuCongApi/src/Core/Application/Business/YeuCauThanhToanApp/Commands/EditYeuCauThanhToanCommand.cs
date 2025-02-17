using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public sealed class EditYeuCauThanhToanCommand : ICommand
{
    public DefaultIdType? Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? Ma { get; set; }
    public int? SoTien { get; set; }
    public int? Phi { get; set; }
    public int? LePhi { get; set; }
    public string? TrangThai { get; set; }
    public DateTime? NgayYeuCau { get; set; }
    public string? NguoiYeuCau { get; set; }
    public string? DonViThu { get; set; }
    public string? HinhThucThanhToan { get; set; }
    public string? HinhThucThu { get; set; }
    public string? ChiTiet { get; set; }
    public string? GhiChuThanhToan { get; set; }
    public string? MauSoBienLai { get; set; }
    public string? KyHieuBienLai { get; set; }
    public string? NguoiThuPhi { get; set; }
    public DateTime? NgayThuPhi { get; set; }
    public string? DonViThuPhiMaSoThue { get; set; }
    public string? DonViMaSoThue { get; set; }
    public DateTime? NgayHoanPhi { get; set; }
    public string? NguoiHoanPhi { get; set; }
    public string? LyDoHoanPhi { get; set; }
    public DateTime? NgayHuy { get; set; }
    public string? NguoiHuy { get; set; }
    public string? LyDoHuy { get; set; }
    public string? NguoiNopTienBienLai { get; set; }
    public string? MaSoThueBienLai { get; set; }
    public string? DiaChiBienLai { get; set; }
    public string? SoTaiKhoanHoanPhi { get; set; }
    public string? TenTaiKhoanHoanPhi { get; set; }
    public string? TenNganHangHoanPhi { get; set; }
}
