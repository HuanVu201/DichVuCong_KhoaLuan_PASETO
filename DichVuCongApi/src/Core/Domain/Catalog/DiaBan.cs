using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog;
public class DiaBan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(150)]
    public string TenDiaBan { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string MaDiaBan { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string ? MaTinh { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? MaHuyen { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? MaXa { get; private set; }
    public int ThuTu { get; private set; } = 1;
    public bool Active { get; private set; } = true;

    public DiaBan() { }

    public DiaBan(string tendiaban, string madiaban, int thutu, bool active, string? maTinh = null, string? maHuyen= null, string? maXa=null)
    {
        TenDiaBan = tendiaban;
        MaDiaBan = madiaban;
        ThuTu = thutu;
        Active = active;
        MaHuyen = maHuyen;
        MaTinh = maTinh;
        MaXa = maXa;
    }

    public static DiaBan Create(string tendiaban, string madiaban, int thutu, bool active, string? maTinh = null, string? maHuyen = null, string? maXa = null)
    {
        return new(tendiaban, madiaban, thutu, active,maTinh,maHuyen,maXa);
    }

    public DiaBan Update(string tendiaban, string madiaban, int thutu, bool active, string? maTinh = null, string? maHuyen = null, string? maXa = null)
    {
        if (!string.IsNullOrEmpty(tendiaban) && !TenDiaBan.Equals(tendiaban))
            TenDiaBan = tendiaban;
        if (!string.IsNullOrEmpty(madiaban) && !MaDiaBan.Equals(madiaban))
            MaDiaBan = madiaban;
        if (thutu != null)
            ThuTu = (int)thutu;
        if (active != null)
            Active = (bool)active;
        if (maTinh != null)
            MaTinh = maTinh;
        if (maHuyen != null)
            MaHuyen = maHuyen;
        if (maXa != null)
            MaXa = maXa;
        return this;
    }

    public DiaBan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DiaBan Restore()
    {
        DeletedOn = null;
        return this;
    }
}


