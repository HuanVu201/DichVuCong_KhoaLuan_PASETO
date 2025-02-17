using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog;
public class BuocXuLy : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string TenBuoc { get; private set; }
    public BuocXuLy() { }

    public BuocXuLy(string tenBuoc)
    {
       TenBuoc = tenBuoc;
    }

    public static BuocXuLy Create(string tenBuoc)
    {
        return new(tenBuoc);
    }
    public BuocXuLy Update(string tenBuoc)
    {
        if (!string.IsNullOrEmpty(tenBuoc) && !TenBuoc.Equals(tenBuoc))
            TenBuoc = tenBuoc;
        return this;
    }
    public BuocXuLy SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public BuocXuLy Restore()
    {
        DeletedOn = null;
        return this;
    }
}
