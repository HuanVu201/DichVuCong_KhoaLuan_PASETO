using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TD.DichVuCongApi.Domain.Portal;
public class Banner : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [Required]
    [Column(TypeName = "varchar")]
    [MaxLength(500)]
    public string ImageUrl { get; private set; }
    public bool? SuDung { get; private set; }
    public DateTime? DeletedOn { get; set; }
    public DefaultIdType? DeletedBy { get; set; }

    public Banner(string imageUrl, bool? suDung)
    {
        ImageUrl = imageUrl;
        SuDung = suDung;
    }

    public static Banner Create(string imageUrl, bool? suDung)
    {
        return new(imageUrl, suDung);
    }

    public Banner Update(string? imageUrl, bool? suDung)
    {
        if (!string.IsNullOrEmpty(imageUrl) && !ImageUrl.Equals(imageUrl))
            ImageUrl = imageUrl;
        if (suDung != null)
            SuDung = suDung;
        return this;
    }
    public Banner SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Banner Restore()
    {
        DeletedOn = null;
        return this;
    }
}
