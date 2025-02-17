using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class LoaiPhiLePhi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public string Ten { get; private set; }
    public string Ma { get; private set; }
    public bool SuDung { get; private set; }
    public LoaiPhiLePhi(string ten, string ma, bool suDung)
    {
        Ten = ten;
        Ma = ma;
        SuDung = suDung;
    }
    public static LoaiPhiLePhi Create(string ten, string ma, bool suDung)
    {
        return new(ten, ma, suDung);
    }
    public LoaiPhiLePhi Update(string ten, string ma, bool suDung)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (suDung != null)
            SuDung = suDung;
        return this;
    }
    public LoaiPhiLePhi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public LoaiPhiLePhi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
