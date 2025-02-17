using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog;
public class NgayNghi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public DateTimeOffset Date { get; internal set; }
    [MaxLength(2000)]
    public string Description { get; private set; }
    public NgayNghi() { }
    public NgayNghi(DateTimeOffset date, string description)
    {
        Date = date;
        Description = description;
    }

    public static NgayNghi Create(DateTimeOffset date, string description)
    {
        return new(date, description);
    }
    public NgayNghi Update(DateTimeOffset date, string description)
    {
        if (!string.IsNullOrEmpty(description) && !Description.Equals(description))
            Description = description;
        if (date != null)
            Date = date;
        return this;
    }
    public NgayNghi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public NgayNghi Restore()
    {
        DeletedOn = null;
        return this;
    }

}
