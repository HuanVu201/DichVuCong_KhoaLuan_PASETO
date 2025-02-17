using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Business;
public class KetQuaLienQuan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(150)]
    public string? LoaiKetQua { get; private set; }
    [MaxLength(100)]
    public string? SoKyHieu { get; private set; }
    [MaxLength(2000)]
    public string? TrichYeu { get; private set; }
    public DateTime? NgayKy { get; private set; }
    [MaxLength(300)]
    public string? NguoiKy { get; private set; }
    [MaxLength(300)]
    public string? CoQuanBanHanh { get; private set; }
    public DateTime? NgayCoHieuLuc { get; private set; }
    public DateTime? NgayHetHieuLuc { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TrangThai { get; private set; }
    public string? DinhKem { get; private set; }

    public KetQuaLienQuan() { }

    public KetQuaLienQuan(string maHoSo, string? loaiKetQua, string? soKyHieu, string? trichYeu, DateTime? ngayKy , string nguoiKy, string? coQuanBanHanh, DateTime? ngayCoHieuLuc, DateTime? ngayHetHieuLuc, string? trangThai, string? dinhKem)
    {
        MaHoSo = maHoSo;
        LoaiKetQua = loaiKetQua;
        SoKyHieu = soKyHieu;
        TrichYeu = trichYeu;
        NgayKy = ngayKy ?? null;
        NguoiKy = nguoiKy;
        CoQuanBanHanh = coQuanBanHanh;
        NgayCoHieuLuc = ngayCoHieuLuc;
        NgayHetHieuLuc = ngayHetHieuLuc;
        TrangThai = trangThai;
        DinhKem = dinhKem;
    }

    public KetQuaLienQuan Update(string? maHoSo, string? loaiKetQua, string? soKyHieu, string? trichYeu, DateTime? ngayKy, string? nguoiKy, string? coQuanBanHanh, DateTime? ngayCoHieuLuc, DateTime? ngayHetHieuLuc, string? trangThai, string? dinhKem)
    {
        if (!string.IsNullOrEmpty(maHoSo))
            MaHoSo = maHoSo;
        if (loaiKetQua != null)
            LoaiKetQua = loaiKetQua;
        if (soKyHieu != null)
            SoKyHieu = soKyHieu;
        if (trichYeu != null)
            TrichYeu = trichYeu;
        if (ngayKy != null && ngayKy != default)
            NgayKy = (DateTime)ngayKy;
        if (!string.IsNullOrEmpty(nguoiKy))
            NguoiKy = nguoiKy;
        if (ngayCoHieuLuc != null && ngayCoHieuLuc != default)
            NgayCoHieuLuc = ngayCoHieuLuc;
        if (ngayHetHieuLuc != null && ngayHetHieuLuc != default)
            NgayHetHieuLuc = ngayHetHieuLuc;
        if (trangThai != null)
            TrangThai = trangThai;
        if (coQuanBanHanh != null)
            CoQuanBanHanh = coQuanBanHanh;
        if (dinhKem != null)
            DinhKem = dinhKem;
        return this;
    }
    public KetQuaLienQuan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KetQuaLienQuan Restore()
    {
        DeletedOn = null;
        return this;
    }
}
