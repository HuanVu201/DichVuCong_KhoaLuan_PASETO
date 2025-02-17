using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class PhanAnhKienNghi : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string UserId { get; private set; }
    [MaxLength(200)]
    public string HoTen { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? Email { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? SoDienThoai { get; private set; }
    [MaxLength(1000)]
    public string? DiaChi { get; private set; }
    [MaxLength(2000)]
    public string TieuDe { get; private set; }
    public string NoiDung { get; private set; }
    public DateTime? NgayGui { get; private set; }
    [MaxLength(1)]
    [Column(TypeName = "varchar")]
    public string? TrangThai { get; private set; }

    [MaxLength(200)]
    public string? NguoiTraLoi { get; private set; }
    public string? NoiDungTraLoi { get; private set; }
    [MaxLength(1)]
    [Column(TypeName = "varchar")]
    public string? CongKhai { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }
    public PhanAnhKienNghi() { }
    public PhanAnhKienNghi(string userId, string hoTen, string email, string soDienThoai, string diaChi, string tieuDe, string noiDung, DateTime ngayGui, string trangThai, string nguoiTraLoi, string noiDungTraLoi, string congKhai)
    {
        UserId = userId;
        HoTen = hoTen;
        Email = email;
        SoDienThoai = soDienThoai;
        DiaChi = diaChi;
        TieuDe = tieuDe;
        NoiDung = noiDung;
        NgayGui = ngayGui;
        TrangThai = trangThai;
        NguoiTraLoi = nguoiTraLoi;
        NoiDungTraLoi = noiDungTraLoi;
        CongKhai = congKhai;
    }
    public static PhanAnhKienNghi Create(string userId, string hoTen, string email, string soDienThoai, string diaChi, string tieuDe, string noiDung, DateTime ngayGui, string trangThai, string nguoiTraLoi, string noiDungTraLoi, string congKhai)
    {
        return new(userId, hoTen, email, soDienThoai, diaChi, tieuDe, noiDung, ngayGui, trangThai, nguoiTraLoi, noiDungTraLoi, congKhai);
    }
    public PhanAnhKienNghi Update(string? userId, string? hoTen, string? soDienThoai, string? email, string? diaChi, string? tieuDe, string? noiDung, DateTime? ngayGui, string? trangThai, string? nguoiTraLoi, string? noiDungTraLoi, string? congKhai)
    {
        if (!string.IsNullOrEmpty(userId) && !HoTen.Equals(userId))
            UserId = userId;
        if (!string.IsNullOrEmpty(hoTen) && !HoTen.Equals(hoTen))
            HoTen = hoTen;
        if (!string.IsNullOrEmpty(email) && !Email.Equals(email))
            Email = email;
        if (!string.IsNullOrEmpty(soDienThoai) && !SoDienThoai.Equals(soDienThoai))
            SoDienThoai = soDienThoai;
        if (!string.IsNullOrEmpty(diaChi) && !DiaChi.Equals(diaChi))
            DiaChi = diaChi;
        if (!string.IsNullOrEmpty(tieuDe) && !TieuDe.Equals(tieuDe))
            TieuDe = tieuDe;
        if (!string.IsNullOrEmpty(noiDung) && !NoiDung.Equals(noiDung))
            NoiDung = noiDung;
        if (ngayGui != null)
            NgayGui = (DateTime)ngayGui;
        if (!string.IsNullOrEmpty(trangThai) && !TrangThai.Equals(trangThai))
            TrangThai = trangThai;
        if (!string.IsNullOrEmpty(nguoiTraLoi) && !NguoiTraLoi.Equals(nguoiTraLoi))
            NguoiTraLoi = nguoiTraLoi;
        if (!string.IsNullOrEmpty(noiDungTraLoi) && !NoiDungTraLoi.Equals(noiDungTraLoi))
            NoiDungTraLoi = noiDungTraLoi;
        if (!string.IsNullOrEmpty(congKhai) && !CongKhai.Equals(congKhai))
            CongKhai = congKhai;
        return this;
    }
    public PhanAnhKienNghi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public PhanAnhKienNghi Restore()
    {
        DeletedOn = null;
        return this;
    }

}
