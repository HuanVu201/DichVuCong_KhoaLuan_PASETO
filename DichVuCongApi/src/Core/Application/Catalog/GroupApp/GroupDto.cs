using System.Drawing.Printing;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp;
public class GroupDto : IDto
{
    public Guid Id { get; set; }
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string OfGroupCode { get; set; }
    public string OfGroupName { get; set; }
    public string Type { get; set; }
    public string Catalog { get; set; }
    public string OtherCatalog { get; set; }
    public string LoaiBienLaiThanhToan { get; set; }
    public string MaDinhDanh { get; set; }
    public string CauHinhBienLaiThanhToan { get; set; }
    public bool? DonViQuanLyThuPhi { get; set; }
    public bool? DonViQuanLyTraHoSo { get; set; }
    public bool? YeuCauXacNhanCoKetQua { get; set; }
    public string? SoDienThoai { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? CauHinhBuuDien { get; set; }
    public string? SoBienLai { get; set; }
    public string? MauSoBienLai { get; set; }
    public string? KyHieuBienLai { get; set; }
    public string? MaTinh { get; set; }
    public string? MaSoThue { get; set; }
    public string? GroupOrder { get; set; }
    public string? MaHuyen { get; set; }
    public string? MaXa { get; set; }
    public bool? LayCauHinhBienLaiTheoDonViThu { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
