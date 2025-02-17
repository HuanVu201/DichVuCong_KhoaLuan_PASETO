

using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;

namespace TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
public class DonViThuTucDto : IDto
{
    // public DichVuBaseDto? DichVuCha { get; set; }
    public Guid? Id { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public string Catalog { get; set; }
    public string MaTTHC { get; set; }
    public string TenTTHC { get; set; }
    public string? DonViId { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public Guid? TaiKhoanThuHuongId { get; set; }
    public string GroupName { get; set; }
    public string? UrlRedirect { get; set; }
    public bool BatBuoc { get; set; }
    public bool? SuDung { get; set; }
    public string? MucDo { get; set; }
    public string? MaSoThue { get; set; }
    public string? DonViMaSoThue { get; set; }
    public string? TKThuHuong { get; set; }
    public string? MaNHThuHuong { get; set; }
    public string? TenTKThuHuong { get; set; }
    public string DinhKem { get; set; }
    public string? UserId { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? LinhVucChinh { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public IEnumerable<NguoiTiepNhanSelect> NguoiTiepNhan { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class DonViThuTucDetailDto
{
    public Guid? Id { get; set; }
    public string MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
    public string? DonViId { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public Guid? TaiKhoanThuHuongId { get; set; }
    public string GroupName { get; set; }
    public string UrlRedirect { get; set; }
    public bool BatBuoc { get; set; }
    public string MucDo { get; set; }
    public string? DonViMaSoThue { get; set; }
    public string? MaSoThue { get; set; }
    public string? LinhVucChinh { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public IReadOnlyList<NguoiTiepNhanSelect> NguoiTiepNhan { get; set; }
}
