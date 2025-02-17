using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog;
public class MaVanDonBuuDien : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string Ma { get;private set; }
    public string TrangThai { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string HoSo { get; set; }
    public DateTime? NgayYeuCau { get; private set; }
    public MaVanDonBuuDien(string ma, string? trangThai, string? hoSo, DateTime? ngayYeuCau)
    {
        Ma = ma;
        TrangThai = trangThai;
        HoSo = hoSo;
        NgayYeuCau = ngayYeuCau;
    }
    public static MaVanDonBuuDien Create(string ma, string? trangThai, string? hoSo, DateTime? ngayYeuCau)
    {
        return new (ma,trangThai,hoSo,ngayYeuCau);
    }
    public MaVanDonBuuDien Update(string? ma, string? trangThai, string? hoSo, DateTime? ngayYeuCau)
    {
        if (ma != null) Ma = ma;
        if (trangThai != null) TrangThai = trangThai;
        if (hoSo != null) HoSo = hoSo;
        if (ngayYeuCau != null & ngayYeuCau != default) NgayYeuCau = ngayYeuCau;
        return this;
    }
    public MaVanDonBuuDien ThuHoiMaVanDon(string? hoSo)
    {
        if (hoSo != null) HoSo = hoSo == string.Empty ? string.Empty : hoSo;
        DeletedOn = DateTime.UtcNow;
        return this;
    }
    public MaVanDonBuuDien SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public MaVanDonBuuDien Restore()
    {
        DeletedOn = null;
        return this;
    }
}
