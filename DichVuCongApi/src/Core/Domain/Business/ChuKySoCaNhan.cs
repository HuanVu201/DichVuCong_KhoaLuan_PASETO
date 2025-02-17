using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class ChuKySoCaNhan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(35)]
    [Column(TypeName = "varchar")]
    public string UserName { get; set; }
    [MaxLength(1000)]
    public string? HinhAnh { get; set; }
    [MaxLength(1000)]
    public string? MoTa { get; set; }


    public ChuKySoCaNhan() { }
    public ChuKySoCaNhan(string userName, string? hinhAnh, string? moTa)
    {
        UserName = userName;
        HinhAnh = hinhAnh;
        MoTa = moTa;
    }
    public static ChuKySoCaNhan Create(string userName, string? hinhAnh, string? moTa)
    {
        return new ChuKySoCaNhan(userName, hinhAnh, moTa);
    }

    public ChuKySoCaNhan Update(string? hinhAnh, string? moTa)
    {
        HinhAnh = !string.IsNullOrEmpty(hinhAnh) ? hinhAnh : HinhAnh;
        MoTa = !string.IsNullOrEmpty(moTa) ? moTa : MoTa;

        return this;
    }

    public ChuKySoCaNhan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ChuKySoCaNhan Restore()
    {
        DeletedOn = null;
        return this;
    }
}
