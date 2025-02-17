using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class LoaiNhomGiayToCaNhan : AuditableEntity<DefaultIdType>, IAggregateRoot // NamDinh
{
    [MaxLength(2000)]
    public string Ten { get; set; }
    [MaxLength(35)]
    [Column(TypeName = "varchar")]
    public string SoDinhDanh { get; set; }
    [MaxLength(2000)]
    public string? GhiChu { get; set; }
    [MaxLength(50)]
    public string? Loai { get; set; }

    public LoaiNhomGiayToCaNhan() { }
    public LoaiNhomGiayToCaNhan(string ten, string soDinhDanh, string? ghiChu, string? loai)
    {
        Ten = ten;
        SoDinhDanh = soDinhDanh;
        GhiChu = ghiChu;
        Loai = loai;
    }

    public static LoaiNhomGiayToCaNhan Create(string ten, string soDinhDanh, string? ghiChu, string? loai)
    {
        return new LoaiNhomGiayToCaNhan(ten, soDinhDanh, ghiChu, loai);
    }

    public LoaiNhomGiayToCaNhan Update(string? ten, string? soDinhDanh, string? ghiChu, string? loai)
    {

        if (!string.IsNullOrEmpty(ten))
            Ten = ten.Trim();
        if (!string.IsNullOrEmpty(soDinhDanh))
            SoDinhDanh = soDinhDanh.Trim();
        if (!string.IsNullOrEmpty(loai))
            Loai = loai.Trim();
        GhiChu = ghiChu.Trim();

        return this;
    }

    public LoaiNhomGiayToCaNhan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public LoaiNhomGiayToCaNhan Restore()
    {
        DeletedOn = null;
        return this;
    }

}
