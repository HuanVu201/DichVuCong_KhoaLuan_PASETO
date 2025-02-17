using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
public sealed class UpdateTruongHopThuTucCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? ThuTucId { get; set; }
    public string? MaSoBieuMau { get; set; }
    public double? ThoiGianThucHien { get; set; }
    public double? ThoiGianThucHienTrucTuyen { get; set; }
    public string? LoaiThoiGianThucHien { get; set; }
    public bool? BatBuocDinhKemKetQua { get; set; }
    public bool? BatBuocDungDiaBan { get; set; }
    public bool? ChoChuyenPhiDiaGioi { get; set; }
    public bool? KhongThuBanGiay { get; set; }
    public bool? YeuCauNopPhiTrucTuyen { get; set; }
    public string? DonViTiepNhanRieng { get; set; }
    public string? EForm { get; set; }
    public string? EFormKetQua { get; set; }
    public string? EFormTemplate { get; set; }
    public string? NodeQuyTrinh { get; set; }
    public string? EdgeQuyTrinh { get; set; }
    public bool? BatBuocKySoKetQua { get; set; }
    public bool? AnThongTinLienHeNopTrucTuyen { get; set; }
    public bool? KhongCoNgayHenTra { get; set; }
    public bool? ChoPhepNopUyQuyen { get; set; }
    public string? LoaiBaoTroXaHoi { get; set; }
    public string? LoaiDuLieuKetNoi { get; set; }
    public bool? KhongNopTrucTuyen { get; set; }
    public string? NoteNgayLamViec { get; set; }
    public string? NoteTraKetQua { get; set; }

}
