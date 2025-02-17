using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Xml.Linq;
using System.Web;
using System.Net.WebSockets;

namespace TD.DichVuCongApi.Domain.Catalog;
public class MenuKetQuaThuTuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(600)]
    public string TenMenu { get; private set; }
    public Guid? ParentId { get; private set; }
    public int ThuTuMenu { get; private set; } = 1;
    public bool Active { get; private set; } = true;
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? IconName { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDonVi { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? MaKetQuaTTHC { get; private set; }
    [MaxLength(50)]
    public string? MaTTHC { get; private set; }
    [MaxLength(50)]
    public string? Catalog { get; private set; }
    [MaxLength(500)]
    public string QueryStringParams { get; private set; }

    public MenuKetQuaThuTuc() { }

    public MenuKetQuaThuTuc(string tenMenu, Guid? parentId, int thuTuMenu, bool active, string? iconName, string? maDonVi, string maTTHC, string? catalog, string? maKetQuaTTHC)
    {
        TenMenu = tenMenu;
        ParentId = parentId;
        ThuTuMenu = thuTuMenu;
        Active = active;
        IconName = iconName;
        MaDonVi = maDonVi;
        MaTTHC = maTTHC;
        Catalog = catalog;
        MaKetQuaTTHC = maKetQuaTTHC;
        
        QueryStringParams = GenerateQueryStringPath(maDonVi, maTTHC, catalog, maKetQuaTTHC);
    }

    public string GenerateQueryStringPath(string? maDonVi, string? maTTHC, string? catalog, string? maKetQuaTTHC)
    {
        Dictionary<string, string> dic = new Dictionary<string, string>();
        if (!string.IsNullOrEmpty(MaDonVi))
        {
            dic.Add("MaDonVi", maDonVi);
        }
        if (!string.IsNullOrEmpty(maTTHC))
        {
            dic.Add("MaTTHC", maTTHC);
        }
        if (!string.IsNullOrEmpty(catalog))
        {
            dic.Add("Catalog", catalog);
        }
        if (!string.IsNullOrEmpty(maKetQuaTTHC))
        {
            dic.Add("MaKetQuaTTHC", maKetQuaTTHC);
        }
        var queryUrl = string.Join("&", dic.Select(x => $"{x.Key}={x.Value}"));
        return queryUrl != null ? "?" + queryUrl : null;
    }

    public MenuKetQuaThuTuc Update(string? tenMenu, Guid? parentId, int? thuTuMenu, bool? active, string? iconName, string? maDonVi, string maTTHC, string? queryStringParams, string? catalog, string? maKetQuaTTHC)
    {
        if (!string.IsNullOrEmpty(tenMenu) && !TenMenu.Equals(tenMenu))
            TenMenu = tenMenu;
        ParentId = parentId;
        if (thuTuMenu != null)
            ThuTuMenu = (int)thuTuMenu;
        if (active != null)
            Active = (bool)active;
        if (iconName != null)
            IconName = iconName;
        if(maKetQuaTTHC != null)
            MaKetQuaTTHC = maKetQuaTTHC;
        if (maDonVi != null)
            MaDonVi = maDonVi;
        if (catalog != null)
            Catalog = catalog;
        if (!string.IsNullOrEmpty(maTTHC))
            MaTTHC = maTTHC;
        QueryStringParams = GenerateQueryStringPath(MaDonVi, MaTTHC, Catalog, MaKetQuaTTHC);

        if (!string.IsNullOrEmpty(queryStringParams))
            QueryStringParams = queryStringParams;
        return this;
    }
    public MenuKetQuaThuTuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public MenuKetQuaThuTuc Restore()
    {
        DeletedOn = null;
        return this;
    }
}
