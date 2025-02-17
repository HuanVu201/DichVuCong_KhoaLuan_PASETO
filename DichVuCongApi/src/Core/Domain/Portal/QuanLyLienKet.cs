using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TD.DichVuCongApi.Domain.Portal;
public class QuanLyLienKet : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public string Ten { get; private set; }
    public string? Ma { get; private set; }
    public string? LinkLienKet { get; private set; }
    public bool? SuDung { get; private set; } = false;
    public int? ThuTu { get; private set; } = 1;
    public DateTime? DeletedOn { get; set; }
    public DefaultIdType? DeletedBy { get; set; }
    public QuanLyLienKet() { }
    public QuanLyLienKet(string ten,string ma,string linkLienKet,bool suDung,int thuTu)
    {
        Ten = ten;
        Ma = ma;
        LinkLienKet = linkLienKet;
        SuDung = suDung;
        ThuTu = thuTu;  
    }

    public static QuanLyLienKet Create(string? ten, string? ma, string? linkLienKet, bool suDung, int thuTu)
    {
        return new(ten,ma,linkLienKet,suDung,thuTu );
    }

    public QuanLyLienKet Update(string? ten, string? ma, string? linkLienKet, bool? suDung, int? thuTu)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(linkLienKet))
            LinkLienKet = linkLienKet;
        if (suDung != null)
            SuDung = suDung;
        if (thuTu != null)
            ThuTu = thuTu;
        return this;
    }
    public QuanLyLienKet SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public QuanLyLienKet Restore()
    {
        DeletedOn = null;
        return this;
    }
}
