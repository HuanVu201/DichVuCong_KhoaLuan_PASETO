using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class GiayToSoHoaChiaSe : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(35)]
    [Column(TypeName = "varchar")]
    public string SoDinhDanh { get; set; }
    public Guid? GiayToSoHoaId { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? MaDinhDanhChiaSe { get; set; }

    public GiayToSoHoaChiaSe() { }
    public GiayToSoHoaChiaSe(string soDinhDanh, Guid? giayToSoHoaId, string? maDinhDanhChiaSe )
    {
        SoDinhDanh = soDinhDanh;
        GiayToSoHoaId = giayToSoHoaId;
        MaDinhDanhChiaSe = maDinhDanhChiaSe;
    }
    public static GiayToSoHoaChiaSe Create(string soDinhDanh, Guid? giayToSoHoaId, string? maDinhDanhChiaSe )
    {
        return new GiayToSoHoaChiaSe(soDinhDanh, giayToSoHoaId, maDinhDanhChiaSe);
    }

    public GiayToSoHoaChiaSe Update(string? maDinhDanhChiaSe )
    {
        MaDinhDanhChiaSe = !string.IsNullOrEmpty(maDinhDanhChiaSe) ? maDinhDanhChiaSe : MaDinhDanhChiaSe;
        return this;
    }

    public GiayToSoHoaChiaSe SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public GiayToSoHoaChiaSe Restore()
    {
        DeletedOn = null;
        return this;
    }
}
