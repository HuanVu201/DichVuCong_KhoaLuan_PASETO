using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog;
public class ThuTucThietYeu : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaTTHC { get; private set; }
    [MaxLength(2000)]
    public string TenTTHC { get; private set; }
    [MaxLength(1000)]
    public string? LinkDVC { get; private set; }
    public int? SoThuTu { get; set; }


    public ThuTucThietYeu() { }
    public ThuTucThietYeu(string? maTTHC, string? tenTTHC, string? linkDVC, int soThuTu)
    {
        MaTTHC = maTTHC;
        TenTTHC = tenTTHC;
        LinkDVC = linkDVC;
        SoThuTu = soThuTu;
    }

    public static ThuTucThietYeu Create(string? maTTHC, string? tenTTHC, string? linkDVC, int? soThuTu)
    {
        return new(maTTHC, tenTTHC, linkDVC, soThuTu ?? 1);
    }
    public ThuTucThietYeu Update(string? maTTHC, string? tenTTHC, string? linkDVC, int? soThuTu)
    {
        if (!string.IsNullOrWhiteSpace(maTTHC))
            MaTTHC = maTTHC;
        if (!string.IsNullOrWhiteSpace(tenTTHC))
            TenTTHC = tenTTHC;
        if (!string.IsNullOrWhiteSpace(linkDVC))
            LinkDVC = linkDVC;
        if (soThuTu > 0)
            SoThuTu = soThuTu;

        return this;
    }

    public ThuTucThietYeu SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThuTucThietYeu Restore()
    {
        DeletedOn = null;
        return this;
    }
}