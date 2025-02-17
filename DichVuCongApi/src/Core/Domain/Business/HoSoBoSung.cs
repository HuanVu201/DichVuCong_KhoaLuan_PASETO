using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Business;
public class HoSoBoSung : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(500)]
    public string? NoiDungBoSung { get; private set; }
    public string? DinhKemNoiDungBoSung { get; private set; }
    public DateTime? NgayBoSung { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiYeuCauBoSung { get; private set; }
    public DateTime? NgayHenTraTruoc { get; private set; }
    public DateTime? NgayTiepNhanBoSung { get; private set; }
    public DateTime? NgayHenTraMoi { get; private set; }
    [MaxLength(50)]
    public string? TrangThaiBoSung { get; private set; }
    public string? ThanhPhanBoSung { get; private set; }
    [MaxLength(500)]
    public string? ThongTinTiepNhan { get; private set; }
    public string? DanhSachGiayToBoSung { get; private set; }
    [MaxLength(50)]
    public string? NguoiTiepNhanBoSung { get; private set; }

    public HoSoBoSung() { }

    public HoSoBoSung(string maHoSo, string? noiDungBoSung, string? dinhKemNoiDungBoSung, DateTime? ngayBoSung, string? nguoiYeuCauBoSung, DateTime? ngayHenTraTruoc, string? trangThaiBoSung, string? thanhPhanBoSung)
    {
        MaHoSo = maHoSo;
        NoiDungBoSung = noiDungBoSung;
        DinhKemNoiDungBoSung = dinhKemNoiDungBoSung;
        NgayBoSung = ngayBoSung;
        NguoiYeuCauBoSung = nguoiYeuCauBoSung;
        NgayHenTraTruoc = ngayHenTraTruoc;
        TrangThaiBoSung = trangThaiBoSung;
        ThanhPhanBoSung = thanhPhanBoSung;
    }
    public HoSoBoSung(string maHoSo, string? nguoiYeuCauBoSung, string? nguoiTiepNhanBoSung, DateTime? ngayHenTraTruoc, DateTime? ngayHenTraMoi, string? trangThaiBoSung)
    {
        MaHoSo = maHoSo;
        NguoiYeuCauBoSung = nguoiYeuCauBoSung;
        NguoiTiepNhanBoSung = nguoiTiepNhanBoSung;
        NgayHenTraTruoc = ngayHenTraTruoc;
        NgayHenTraMoi = ngayHenTraMoi;
        TrangThaiBoSung = trangThaiBoSung;
    }
    public HoSoBoSung MotCuaCapNhatBoSung(string? thongTinTiepNhan)
    {
        if (!string.IsNullOrEmpty(thongTinTiepNhan))
            ThongTinTiepNhan = thongTinTiepNhan;
        return this;
    }
    public HoSoBoSung MotCuaGuiBoSung(string? trangThaiBoSung, string? thongTinTiepNhan, string? danhSachGiayToBoSung,
       string? nguoiTiepNhanBoSung, DateTime? ngayTiepNhanBoSung, DateTime? ngayHenTraMoi)
    {
        if (!string.IsNullOrEmpty(trangThaiBoSung))
            TrangThaiBoSung = trangThaiBoSung;
        if (!string.IsNullOrEmpty(thongTinTiepNhan))
            ThongTinTiepNhan = thongTinTiepNhan;
        if (!string.IsNullOrEmpty(danhSachGiayToBoSung))
            DanhSachGiayToBoSung = danhSachGiayToBoSung;
        if (!string.IsNullOrEmpty(nguoiTiepNhanBoSung))
            NguoiTiepNhanBoSung = nguoiTiepNhanBoSung;
        if (ngayTiepNhanBoSung.HasValue && ngayTiepNhanBoSung != default)
            NgayTiepNhanBoSung = ngayTiepNhanBoSung;
        if (ngayHenTraMoi.HasValue && ngayHenTraMoi != default)
            NgayHenTraMoi = ngayHenTraMoi;
        return this;
    }

}
