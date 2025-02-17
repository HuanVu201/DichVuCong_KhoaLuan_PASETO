

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;


public class YeuCauThanhToanPortalDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? LoaiBienLaiThanhToan { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public int Phi { get; set; }
    public int LePhi { get; set; }
    public string? TenNguoiYeuCau { get; set; }
    public string? TenDonVi { get; set; }
    public DateTime NgayThuPhi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
