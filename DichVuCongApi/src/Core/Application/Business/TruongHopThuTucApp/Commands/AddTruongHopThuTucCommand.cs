using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
public class AddTruongHopThuTucCommand : ICommand<DefaultIdType>
{
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string ThuTucId { get; set; } // mã TTHC
    public double ThoiGianThucHien { get; set; }
    public double ThoiGianThucHienTrucTuyen { get; set; }
    public string LoaiThoiGianThucHien { get; set; }
    public string? MaSoBieuMau { get; set; }
    public bool? BatBuocDinhKemKetQua { get; set; }
    public bool? YeuCauNopPhiTrucTuyen { get; set; }
    public bool? ChoChuyenPhiDiaGioi { get; set; }
    public bool? KhongThuBanGiay { get; set; }
    public string? DonViTiepNhanRieng { get; set; }
    public string? EForm { get; set; }
    public string? EFormTemplate { get; set; }
    public bool? BatBuocKySoKetQua { get; set; }
    public bool? AnThongTinLienHeNopTrucTuyen { get; set; }
    public bool? KhongCoNgayHenTra { get; set; }
    public bool? ChoPhepNopUyQuyen { get; set; }
    public bool? BatBuocDungDiaBan { get; set; }
    public string? LoaiDuLieuKetNoi { get; set; }
    public string? LoaiBaoTroXaHoi { get; set; }
    public bool? KhongNopTrucTuyen { get; set; }
    public string? NoteNgayLamViec { get; set; }
    public string? NoteTraKetQua { get; set; }
}
