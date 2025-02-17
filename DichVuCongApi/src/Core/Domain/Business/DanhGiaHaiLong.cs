using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class DanhGiaHaiLong : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(100)]
    public string? LoaiDanhGia { get;private set; }
    public string? NguoiDanhGia { get; private set; }
    public string? NoiDungDanhGia { get;private set; }
    public DateTime? ThoiGianDanhGia { get; private set; }
    [MaxLength(100)]
    public string DanhGia { get;private set; }
    public DanhGiaHaiLong()
    {
    }

    public DanhGiaHaiLong(string maHoSo, string? loaiDanhGia, string? nguoiDanhGia, DateTime? thoiGianDanhGia, string danhGia, string? noiDungDanhGia)
    {
        MaHoSo = maHoSo;
        LoaiDanhGia = loaiDanhGia;
        NguoiDanhGia = nguoiDanhGia;
        ThoiGianDanhGia = thoiGianDanhGia;
        DanhGia = danhGia;
        NoiDungDanhGia = noiDungDanhGia;
    }
    public static DanhGiaHaiLong Create(string maHoSo, string? loaiDanhGia, string? nguoiDanhGia, DateTime? thoiGianDanhGia, string danhGia, string? noiDungDanhGia)
    {
        return new DanhGiaHaiLong(maHoSo, loaiDanhGia, nguoiDanhGia, thoiGianDanhGia, danhGia, noiDungDanhGia);
    }
    public DanhGiaHaiLong Update(string maHoSo, string? loaiDanhGia, string? nguoiDanhGia, DateTime? thoiGianDanhGia, string danhGia, string? noiDungDanhGia)
    {
        MaHoSo = !string.IsNullOrEmpty(maHoSo) ? maHoSo : MaHoSo;
        LoaiDanhGia = !string.IsNullOrEmpty(loaiDanhGia) ? loaiDanhGia : LoaiDanhGia;
        NguoiDanhGia = !string.IsNullOrEmpty(nguoiDanhGia)? nguoiDanhGia : NguoiDanhGia;
        ThoiGianDanhGia = thoiGianDanhGia.HasValue ? thoiGianDanhGia.Value : ThoiGianDanhGia;
        DanhGia = !string.IsNullOrEmpty(danhGia) ? danhGia : DanhGia;
        NoiDungDanhGia = !string.IsNullOrEmpty(noiDungDanhGia) ? noiDungDanhGia : NoiDungDanhGia;
        return this;
    }
    public DanhGiaHaiLong SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DanhGiaHaiLong Restore()
    {
        DeletedOn = null;
        return this;
    }
}
