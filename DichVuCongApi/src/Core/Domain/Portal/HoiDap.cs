using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class HoiDap : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string HoTen { get; private set; }

    [Column(TypeName = "varchar")]
    public string? Email { get; private set; }

    [Column(TypeName = "varchar")]
    public string? SoDienThoai { get; private set; }


    [Column(TypeName = "varchar")]
    public string? Ma { get; private set; }

    [MaxLength(1000)]
    public string TieuDe { get; private set; }


    [MaxLength(1000)]
    public string NoiDung { get; private set; }

    [MaxLength(100)]
    public string? DiaChi { get; private set; }

    public DateTime? NgayGui { get; private set; }

    [MaxLength(1000)]
    public string TraLoi { get; private set; }

    [MaxLength(100)]
    public string NguoiTraLoi { get; private set; }

    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string CongKhai { get; private set; }


    [MaxLength(1000)]
    public string DinhKem { get; private set; }
    public string MaDonVi { get; private set; }

    [MaxLength(50)]
    public string TrangThai { get; private set; }

    [MaxLength(1000)]
    public string TieuDeTraLoi { get; private set; }

    [MaxLength(1000)]
    public string NoiDungTraLoi { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }
    public HoiDap() { }
    public HoiDap(string tieuDe, string hoTen, string soDienThoai, string email, string diaChi, string noiDung, string maDonVi, string ma, DateTime ngaygui, string traLoi, string nguoiTraLoi, string congKhai, string dinhKem, string trangThai, string tieuDeTraLoi, string noiDungTraLoi)
    {
        TieuDe = tieuDe;
        HoTen = hoTen;
        SoDienThoai = soDienThoai;
        Email = email;
        DiaChi = diaChi;
        NoiDung = noiDung;
        MaDonVi = maDonVi;
        Ma = ma;
        NgayGui = ngaygui;
        TraLoi = traLoi;
        NguoiTraLoi = nguoiTraLoi;
        CongKhai = congKhai;
        DinhKem = dinhKem;
        TrangThai = trangThai;
        TieuDeTraLoi = tieuDeTraLoi;
        NoiDungTraLoi = noiDungTraLoi;

    }
    public static HoiDap Create(string tieuDe, string hoTen, string soDienThoai, string email, string diaChi, string noiDung, string maDonVi, string ma, DateTime ngaygui, string traLoi, string nguoiTraLoi, string congKhai, string dinhKem, string trangThai, string tieuDeTraLoi, string noiDungTraLoi)
    {
        return new(tieuDe, hoTen, soDienThoai, email, diaChi, noiDung, maDonVi, ma, ngaygui, traLoi, nguoiTraLoi, congKhai, dinhKem, trangThai, tieuDeTraLoi, noiDungTraLoi);
    }
    public HoiDap Update(string? tieuDe, string? hoTen, string? soDienThoai, string? email, string? diaChi, string? noiDung, string? maDonVi,string? ma, DateTime? ngayGui,string? traLoi, string? nguoiTraLoi,string? congKhai, string? dinhKem,string? trangThai,string? tieuDeTraLoi,string? noiDungTraLoi)
    {
        if (!string.IsNullOrEmpty(tieuDe) && !TieuDe.Equals(tieuDe))
            TieuDe = tieuDe;
        if (!string.IsNullOrEmpty(hoTen) && !HoTen.Equals(hoTen))
            HoTen = hoTen;
        if (!string.IsNullOrEmpty(soDienThoai) && !SoDienThoai.Equals(soDienThoai))
            SoDienThoai = soDienThoai;
        if (!string.IsNullOrEmpty(email) && !Email.Equals(email))
            Email = email;
        if (!string.IsNullOrEmpty(diaChi) && !DiaChi.Equals(diaChi))
            DiaChi = diaChi;
        if (!string.IsNullOrEmpty(noiDung) && !NoiDung.Equals(noiDung))
            NoiDung = noiDung;
        if (!string.IsNullOrEmpty(maDonVi) && !MaDonVi.Equals(maDonVi))
            MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
       if (ngayGui != null)
            NgayGui = (DateTime)ngayGui;
        if (!string.IsNullOrEmpty(traLoi) && !TraLoi.Equals(traLoi))
            TraLoi = traLoi;
        if (!string.IsNullOrEmpty(nguoiTraLoi) && !NguoiTraLoi.Equals(nguoiTraLoi))
            NguoiTraLoi = nguoiTraLoi;
        if (!string.IsNullOrEmpty(congKhai) && !CongKhai.Equals(congKhai))
            CongKhai = congKhai;
        if (!string.IsNullOrEmpty(dinhKem) && !DinhKem.Equals(dinhKem))
            DinhKem = dinhKem;
        if (!string.IsNullOrEmpty(trangThai) && !TrangThai.Equals(trangThai))
            TrangThai = trangThai;
        if (!string.IsNullOrEmpty(tieuDeTraLoi) && !TieuDeTraLoi.Equals(tieuDeTraLoi))
            TieuDeTraLoi = tieuDeTraLoi;
        if (!string.IsNullOrEmpty(noiDungTraLoi) && !NoiDungTraLoi.Equals(noiDungTraLoi))
            NoiDungTraLoi = noiDungTraLoi;
        return this;
    }
    public HoiDap SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public HoiDap Restore()
    {
        DeletedOn = null;
        return this;
    }

}
