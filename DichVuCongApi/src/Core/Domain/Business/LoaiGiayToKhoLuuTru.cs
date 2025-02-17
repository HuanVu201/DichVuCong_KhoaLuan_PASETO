using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class LoaiGiayToKhoLuuTru : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string Ma { get; set; }
    [MaxLength(200)]
    public string Ten { get; set; }
    public string? Eform { get; set; }
    public bool? SuDung { get; set; }

    public LoaiGiayToKhoLuuTru(string ma, string ten, string? eform, bool? suDung)
    {
        Ma = ma;
        Ten = ten;
        Eform = eform;
        SuDung = suDung;
    }

    public static LoaiGiayToKhoLuuTru Create(string ma, string ten, string? eform, bool? suDung)
    {
        return new LoaiGiayToKhoLuuTru(ma, ten, eform, suDung);
    }

    public LoaiGiayToKhoLuuTru Update(string? ma, string? ten, string? eform, bool? suDung)
    {
        if (!string.IsNullOrEmpty(ma))
            Ma = ma.Trim();
        if (!string.IsNullOrEmpty(ten))
            Ten = ten.Trim();
        if (!string.IsNullOrEmpty(eform))
            Eform = eform.Trim();
        if (suDung.HasValue)
            SuDung = suDung;
        return this;
    }

    public LoaiGiayToKhoLuuTru SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public LoaiGiayToKhoLuuTru Restore()
    {
        DeletedOn = null;
        return this;
    }

}