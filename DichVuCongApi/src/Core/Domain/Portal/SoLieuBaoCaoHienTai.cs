using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class SoLieuBaoCaoHienTai : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string LoaiThongKe { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDinhDanh { get; set; }
    public string? SoLieu { get; set; }

    public SoLieuBaoCaoHienTai(string loaiThongKe, string? maDinhDanh, string soLieu)
    {

        LoaiThongKe = loaiThongKe;
        MaDinhDanh = maDinhDanh;
        SoLieu = soLieu;
    }

    public static SoLieuBaoCaoHienTai Create(string loaiThongKe, string? maDinhDanh, string soLieu)
    {
        return new SoLieuBaoCaoHienTai(loaiThongKe, maDinhDanh, soLieu);
    }

    public SoLieuBaoCaoHienTai Update(string soLieu)
    {
        if (!string.IsNullOrEmpty(soLieu))
            SoLieu = soLieu.Trim();
        return this;
    }
}