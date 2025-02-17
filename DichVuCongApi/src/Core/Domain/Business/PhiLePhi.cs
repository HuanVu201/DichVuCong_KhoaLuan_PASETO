using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business;
public class PhiLePhi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(2000)]
    public string Ten { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? Ma { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string ThuTucId { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TruongHopId { get; private set; }
    public string Loai { get; private set; }
    public int? SoTien { get; private set; }

    public string? MoTa { get; private set; }
    [MaxLength(500)]
    public string? DinhKem { get; private set; }

    public PhiLePhi() { }
    public PhiLePhi(string ten, string ma, string maThuTuc, string maTruongHop, string loai, int? soTien, string? moTa, string? dinhKem)
    {
        Ten = ten;
        Ma = ma;
        ThuTucId = maThuTuc;
        TruongHopId = maTruongHop;
        Loai = loai;
        SoTien = soTien;
        MoTa = moTa;
        DinhKem = dinhKem;
    }

    public static PhiLePhi Create(string ten, string ma, string maThuTuc, string maTruongHop, string loai, int? soTien, string? moTa, string? dinhKem)
    {
        return new(ten, ma, maThuTuc, maTruongHop, loai, soTien, moTa, dinhKem);
    }

    public PhiLePhi Update(string? ten, string? ma, string? maThuTuc, string? maTruongHop, string? loai, int? soTien, string? moTa, string? dinhKem)
    {
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(maThuTuc))
            ThuTucId = maThuTuc;
        if (!string.IsNullOrEmpty(maTruongHop))
            TruongHopId = maTruongHop;
        if (!string.IsNullOrEmpty(loai))
            Loai = loai;
        if (soTien != null)
            SoTien = soTien;
        if (!string.IsNullOrEmpty(moTa))
            MoTa = moTa;
        if (!string.IsNullOrEmpty(dinhKem))
            DinhKem = dinhKem;
        return this;
    }
    public PhiLePhi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public PhiLePhi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
