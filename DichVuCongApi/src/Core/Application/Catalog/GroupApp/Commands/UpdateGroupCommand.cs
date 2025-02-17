using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
public sealed class UpdateGroupCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfGroupCode { get; set; }
    public string? OfGroupName { get; set; }
    public string? OfGroupId { get; set; }
    public int? GroupOrder { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? DonViQuanLyTraHoSo { get; set; }
    public bool? YeuCauXacNhanCoKetQua { get; set; }
    public bool? DonViQuanLyThuPhi { get; set; }
    public bool? Active { get; set; }
    public string? Agent { get; set; }
    public string? Description { get; set; }
    public string? Type { get; set; }
    public string? Catalog { get; set; }
    public string? OtherCatalog { get; set; }
    public string? TaiKhoanThuHuong { get; set; }
    public string? MaNganHang { get; set; }
    public string? TenTaiKhoanThuHuong { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaNhomLienThong { get; set; }
    public string? LoaiBienLaiThanhToan { get; set; }
    public string? CauHinhBienLaiThanhToan { get; set; }
    public string? MaSoThue { get; set; }
    public string? DiaChi { get; set; }
    public string? SoDienThoai { get; set; }
    public string? ThoiGianLamViec { get; set; }
    public string? Email { get; set; }
    public string? Website { get; set; }
    public string? MaTinh { get; set; }
    public string? MaHuyen { get; set; }
    public string? MaXa { get; set; }
    public string? MaDiaBan { get; set; }
    public string? SoBienLai { get; set; }
    public string? MauSoBienLai { get; set; }
    public string? KyHieuBienLai { get; set; }
    public string? Coordinates { get; set; }
    public string? CauHinhBuuDien { get; set; }
    public string? LienThongTNMT { get; set; }
}
