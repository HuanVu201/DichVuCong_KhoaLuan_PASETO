using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class TrangThaiHoSo : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string Ten { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? Ma { get; private set; }
    [MaxLength(100)]
    public string? MoTa { get; private set; }
    public bool? LaTrangThaiQuyTrinh { get; private set; } = false;

    public TrangThaiHoSo() { }
    public TrangThaiHoSo(string ten, string? ma, string? moTa, bool? laTrangThaiQuyTrinh)
    {
        Ten = ten;
        Ma = ma;
        MoTa = moTa;
        LaTrangThaiQuyTrinh = laTrangThaiQuyTrinh;
    }

    public static TrangThaiHoSo Create(string ten, string? ma, string? moTa, bool? laTrangThaiQuyTrinh)
    {
        return new(ten, ma, moTa, laTrangThaiQuyTrinh);
    }
    public TrangThaiHoSo Update(string? ten, string? ma, string? moTa, bool? laTrangThaiQuyTrinh)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
            MoTa = moTa;
        if (laTrangThaiQuyTrinh != null)
            LaTrangThaiQuyTrinh = laTrangThaiQuyTrinh;
        return this;
    }
    public TrangThaiHoSo SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TrangThaiHoSo Restore()
    {
        DeletedOn = null;
        return this;
    }
}
