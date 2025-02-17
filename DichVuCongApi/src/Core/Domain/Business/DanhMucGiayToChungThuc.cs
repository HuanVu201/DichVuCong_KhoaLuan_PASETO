using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class DanhMucGiayToChungThuc : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    [Column(TypeName ="varchar")]
    public string Ma { get; private set; }
    [MaxLength(500)]
    public string Ten { get; private set; }
    public bool SuDung { get; private set; } = true;
    public DanhMucGiayToChungThuc() { }

    public DanhMucGiayToChungThuc(string ma, string ten, bool suDung)
    {
        Ma = ma;
        Ten = ten;
        SuDung = suDung;
    }

    public DanhMucGiayToChungThuc Update(string? ma, string? ten, bool? suDung)
    {
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (suDung != null)
            SuDung = (bool)suDung;
        return this;
    }

    public DanhMucGiayToChungThuc SoftDelete()
    {
        SuDung = false;
        return this;
    }

    public DanhMucGiayToChungThuc Restore()
    {
        SuDung = true;
        return this;
    }
}
