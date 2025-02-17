namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
public class TruongHopThuTucDetail : IDto
{
    public Guid Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
    public string ThuTucId { get; set; }
    public double? ThoiGianThucHien { get; set; }
    public double? ThoiGianThucHienTrucTuyen { get; set; }
    public string LoaiThoiGianThucHien { get; set; }
    public bool? BatBuocDinhKemKetQua { get; set; }
    public bool? YeuCauNopPhiTrucTuyen { get; set; }
    public string? DonViTiepNhanRieng { get; set; }
    public string? EForm { get; set; }
    public string? EFormTemplate { get; set; }
    public string? NodeQuyTrinh { get; set; }
    public string? EdgeQuyTrinh { get; set; }
    public bool? AnThongTinLienHeNopTrucTuyen { get; set; }
    public bool? KhongCoNgayHenTra { get; set; }
    public bool? KhongThuBanGiay { get; set; }
}


