using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class DuThaoXuLyHoSo : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "nvarchar")]
    public string Loai { get; private set; }
    [MaxLength(1500)]
    public string FileDinhKem { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string NguoiXuLy { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? LanhDaoThongQua { get; private set; }
    [MaxLength(100)]
    public string? TaiKhoanLanhDaoKy { get; private set; }
    [MaxLength(100)]
    public string? TenLanhDaoKy { get; private set; }
    [MaxLength(1000)]
    public string? TrichYeu { get; private set; }
    public DateTime? CreatedOn { get; private set; } = DateTime.Now;
    public DateTime? NgayHenTraMoi { get; private set; }
    public Guid? CreatedBy { get; private set; }
    [MaxLength(30)]
    public string TrangThai { get; private set; }
    [MaxLength(100)]
    public string? TrangThaiLienThongQLVB { get; private set; }

    public DuThaoXuLyHoSo() { }

    public DuThaoXuLyHoSo(string maHoSo, string loai, string fileDinhKem, string nguoiXuLy, string? lanhDaoThongQua, string? taiKhoanLanhDaoKy, string? tenLanhDaoKy, string trichYeu, DefaultIdType? createdBy, string trangThai, string trangThaiLienThongQLVB, DateTime? ngayHenTraMoi)
    {
        MaHoSo = maHoSo;
        Loai = loai;
        FileDinhKem = fileDinhKem;
        NguoiXuLy = nguoiXuLy;
        LanhDaoThongQua = lanhDaoThongQua;
        TaiKhoanLanhDaoKy = taiKhoanLanhDaoKy;
        TenLanhDaoKy = tenLanhDaoKy;
        TrichYeu = trichYeu;
        CreatedBy = createdBy;
        TrangThai = trangThai;
        TrangThaiLienThongQLVB = trangThaiLienThongQLVB;
        NgayHenTraMoi = ngayHenTraMoi;
    }
    // dùng cho dapper update trang thái
    public DuThaoXuLyHoSo(string trangThai)
    {
        TrangThai = trangThai;
    }

    public DuThaoXuLyHoSo Update(string? fileDinhKem, string? trichYeu, DateTime? ngayHenTraMoi, string? tenLanhDaoKy, string? taiKhoanLanhDaoKy)
    {
        if (fileDinhKem != null)
            FileDinhKem = fileDinhKem;
        if (trichYeu != null)
            TrichYeu = trichYeu;
        if (ngayHenTraMoi != null && ngayHenTraMoi != DateTime.MinValue)
            NgayHenTraMoi = ngayHenTraMoi;
        if (tenLanhDaoKy != null)
            TenLanhDaoKy = tenLanhDaoKy;
        if (taiKhoanLanhDaoKy != null)
            TaiKhoanLanhDaoKy = taiKhoanLanhDaoKy;
        return this;
    }

    public DuThaoXuLyHoSo UpdateTrangThai(string? trangThai)
    {

        if (!string.IsNullOrEmpty(trangThai))
            TrangThai = trangThai;
        return this;
    }
}
