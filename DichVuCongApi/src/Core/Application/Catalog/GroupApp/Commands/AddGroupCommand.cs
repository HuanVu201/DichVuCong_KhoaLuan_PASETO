using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
public class AddGroupCommand : ICommand<Guid>
{
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string? OfGroupCode { get; set; }
    public string? OfGroupName { get; set; }
    public string? OfGroupId { get; set; }
    public string? FullCode { get; set; }
    public int? GroupOrder { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? DonViQuanLyTraHoSo { get; set; }
    public bool? YeuCauXacNhanCoKetQua { get; set; }
    public bool? DonViQuanLyThuPhi { get; set; }
    public bool? Active { get; set; }
    public string? Agent { get; set; }
    public string? Description { get; set; }
    public string Type { get; set; }
    public string? Catalog { get; set; }
    public string? OtherCatalog { get; set; }
    public string? TaiKhoanThuHuong { get; set; }
    public string? MaNganHang { get; set; }
    public string? TenTaiKhoanThuHuong { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaNhomLienThong { get; set; }
    public string? DiaChi { get; set; }
    public string? SoDienThoai { get; set; }
    public string? ThoiGianLamViec { get; set; }
    public string? Website { get; set; }
    public string? Email { get; set; }
    public int? ThuTu { get; set; }
}
