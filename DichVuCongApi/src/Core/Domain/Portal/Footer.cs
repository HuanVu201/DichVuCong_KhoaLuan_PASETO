using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class Footer : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [Required]
    [MaxLength(255)]
    public string TieuDe { get; private set; }
    public string? ImageUrl { get; private set; }
    public string? NoiDung { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }

    public Footer(string tieuDe, string? noiDung, string? imageUrl)
    {
        TieuDe = tieuDe;
        NoiDung = noiDung;
        ImageUrl = imageUrl;
    }

    public static Footer Create(string tieuDe, string? noiDung, string? imageUrl)
    {
        return new(tieuDe, noiDung, imageUrl);
    }

    public Footer Update(string? tieuDe, string? noiDung, string? imageUrl)
    {
        if (!string.IsNullOrEmpty(tieuDe) && !TieuDe.Equals(tieuDe))
            TieuDe = tieuDe;
        if (!string.IsNullOrEmpty(noiDung) && !NoiDung.Equals(noiDung))
            NoiDung = noiDung;
        if (!string.IsNullOrEmpty(imageUrl) && !NoiDung.Equals(imageUrl))
            ImageUrl = imageUrl;
        return this;
    }

    public Footer SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Footer Restore()
    {
        DeletedOn = null;
        return this;
    }
}
