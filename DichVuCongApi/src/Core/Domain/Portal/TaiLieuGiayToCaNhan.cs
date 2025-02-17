using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class TaiLieuGiayToCaNhan : AuditableEntity<DefaultIdType>, IAggregateRoot // NamDinh
{
    [MaxLength(2000)]
    public string TenGiayTo { get; set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string DuongDan { get; set; }
    [MaxLength(50)]
    public string Type { get; set; }
    [MaxLength(50)]
    public string LoaiNhomGiayToCaNhanId { get; set; }

    public TaiLieuGiayToCaNhan() { }
    public TaiLieuGiayToCaNhan(string tenGiayTo, string duongDan, string type, string loaiNhomGiayToCaNhanId)
    {
        TenGiayTo = tenGiayTo;
        DuongDan = duongDan;
        Type = type;
        LoaiNhomGiayToCaNhanId = loaiNhomGiayToCaNhanId;
    }

    public static TaiLieuGiayToCaNhan Create(string tenGiayTo, string duongDan, string type, string loaiNhomGiayToCaNhanId)
    {
        return new TaiLieuGiayToCaNhan(tenGiayTo, duongDan, type, loaiNhomGiayToCaNhanId);
    }

    public TaiLieuGiayToCaNhan Update(string? tenGiayTo, string? duongDan, string? type, string? loaiNhomGiayToCaNhanId)
    {

        if (!string.IsNullOrEmpty(tenGiayTo))
            TenGiayTo = tenGiayTo.Trim();
        if (!string.IsNullOrEmpty(duongDan))
            DuongDan = duongDan.Trim();
        if (!string.IsNullOrEmpty(type))
            Type = type.Trim();
        if (!string.IsNullOrEmpty(loaiNhomGiayToCaNhanId))
            LoaiNhomGiayToCaNhanId = loaiNhomGiayToCaNhanId.Trim();

        return this;
    }

    public TaiLieuGiayToCaNhan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TaiLieuGiayToCaNhan Restore()
    {
        DeletedOn = null;
        return this;
    }

}
