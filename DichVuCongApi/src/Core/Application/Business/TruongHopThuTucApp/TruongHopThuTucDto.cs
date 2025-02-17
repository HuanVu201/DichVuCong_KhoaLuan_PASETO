

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;


public class TruongHopThuTucDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? MaDonVi { get; set; }
    public string? TenDonVi { get; set; }
    public string Ma { get; set; }
    public string Ten { get; set; }
    public string? MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
    public double ThoiGianThucHien { get; set; }
    public double ThoiGianThucHienTrucTuyen { get; set; }
    public string LoaiThoiGianThucHien { get; set; }
    public string DonViTiepNhanRieng { get; set; }
    public string YeuCauNopPhiTrucTuyen { get; set; }
    public bool? KhongCoNgayHenTra { get; set; }
    public string? NoteNgayLamViec { get; set; }
    public string? NoteTraKetQua { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
