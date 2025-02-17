using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class TinBai : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(255)]
    public string TieuDe { get; private set; }
    public DateTime NgayBanHanh { get; private set; }
    public DateTime? NgayKetThuc { get; private set; }
    [MaxLength(255)]
    public string? TrichYeu { get; private set; }
    public string? NoiDung { get; private set; }
    [MaxLength(255)]
    public string? NguonTin { get; private set; }
    [ForeignKey("KenhTin")]
    public Guid KenhTinId { get; private set; }
    public KenhTin KenhTin { get; private set; }
    [ForeignKey("TrangThai")]
    public Guid TrangThaiId { get; private set; }
    public TrangThai TrangThai { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? AnhDaiDien { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? FileDinhKem { get; private set; }
    [MaxLength(255)]
    public string? Tacgia { get; private set; }
    public bool? ChoPhepBinhLuan { get; private set; }
    public bool? HienThiLenTrangChu { get; private set; }
    public bool? TinNoiBat { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }
    public TinBai() { }
    public TinBai(string tieuDe, DateTime ngayBanHanh, DateTime? ngayKetThuc, string? trichYeu, string? noiDung, string? nguonTin, DefaultIdType kenhTinId, DefaultIdType trangThaiId, string? anhDaiDien, string? fileDinhKem, string? tacgia, bool? choPhepBinhLuan, bool? hienThiLenTrangChu, bool? tinNoiBat)
    {
        TieuDe = tieuDe;
        NgayBanHanh = ngayBanHanh;
        NgayKetThuc = ngayKetThuc;
        TrichYeu = trichYeu;
        NoiDung = noiDung;
        NguonTin = nguonTin;
        KenhTinId = kenhTinId;
        TrangThaiId = trangThaiId;
        AnhDaiDien = anhDaiDien;
        FileDinhKem = fileDinhKem;
        Tacgia = tacgia;
        ChoPhepBinhLuan = choPhepBinhLuan;
        HienThiLenTrangChu = hienThiLenTrangChu;
        TinNoiBat = tinNoiBat;
    }

    public static TinBai Create(string tieuDe, DateTime ngayBanHanh, DateTime? ngayKetThuc, string? trichYeu, string? noiDung, string? nguonTin, DefaultIdType kenhTinId, DefaultIdType trangThaiId, string? anhDaiDien, string? fileDinhKem, string? tacgia, bool? choPhepBinhLuan, bool? hienThiLenTrangChu, bool? tinNoiBat)
    {
        return new(tieuDe, ngayBanHanh, ngayKetThuc, trichYeu, noiDung, nguonTin, kenhTinId, trangThaiId, anhDaiDien, fileDinhKem, tacgia, choPhepBinhLuan, hienThiLenTrangChu, tinNoiBat);
    }

    public TinBai Update(string? tieuDe, DateTime? ngayBanHanh, DateTime? ngayKetThuc, string? trichYeu, string? noiDung,
        string? nguonTin, DefaultIdType? kenhTinId, DefaultIdType? trangThaiId, string? anhDaiDien, string? fileDinhKem,
        string? tacgia, bool? choPhepBinhLuan, bool? hienThiLenTrangChu, bool? tinNoiBat)
    {
        if (!string.IsNullOrEmpty(tieuDe) && !TieuDe.Equals(tieuDe))
            TieuDe = tieuDe;
        if (ngayBanHanh != null)
            NgayBanHanh = (DateTime)ngayBanHanh;
        if (ngayKetThuc != null)
            NgayKetThuc = (DateTime)ngayKetThuc;
        if (!string.IsNullOrEmpty(trichYeu) && !TrichYeu.Equals(trichYeu))
            TrichYeu = trichYeu;
        if (!string.IsNullOrEmpty(noiDung) && !NoiDung.Equals(noiDung))
            NoiDung = noiDung;
        if (!string.IsNullOrEmpty(nguonTin) && !NguonTin.Equals(nguonTin))
            NguonTin = nguonTin;
    
        if (kenhTinId != null && !KenhTinId.Equals(kenhTinId))
            KenhTinId = (Guid)kenhTinId;
        if (trangThaiId != null && !TrangThaiId.Equals(trangThaiId))
            TrangThaiId = (Guid)trangThaiId;
        if (AnhDaiDien == null || !AnhDaiDien.Equals(anhDaiDien))
            AnhDaiDien = anhDaiDien;
        if (!string.IsNullOrEmpty(fileDinhKem) && !FileDinhKem.Equals(fileDinhKem))
            FileDinhKem = fileDinhKem;
        if (!string.IsNullOrEmpty(tacgia) && !Tacgia.Equals(tacgia))
            Tacgia = tacgia;
        if (choPhepBinhLuan != null)
            ChoPhepBinhLuan = (bool)choPhepBinhLuan;
        if (hienThiLenTrangChu != null)
            HienThiLenTrangChu = (bool)hienThiLenTrangChu;
        if (tinNoiBat != null)
            TinNoiBat = (bool)tinNoiBat;
        return this;
    }

    public TinBai SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TinBai Restore()
    {
        DeletedOn = null;
        return this;
    }
}
