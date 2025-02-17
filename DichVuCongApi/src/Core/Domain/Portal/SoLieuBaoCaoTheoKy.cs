using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Domain.Portal;
public class SoLieuBaoCaoTheoKy : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(20)]
    public string LoaiThoiGian { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string Ky { get; set; }
    [MaxLength(4)]
    [Column(TypeName = "varchar")]
    public string Nam { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string LoaiThongKe { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDinhDanh { get; set; }
    public string? SoLieu { get; set; }
    public double? Diem766 { get; set; }

    public SoLieuBaoCaoTheoKy(string loaiThoiGian, string ky, string nam, string loaiThongKe, string? maDinhDanh, string soLieu, double? diem766)
    {
        LoaiThoiGian = loaiThoiGian;
        Ky = ky;
        Nam = nam;
        LoaiThongKe = loaiThongKe;
        MaDinhDanh = maDinhDanh;
        SoLieu = soLieu;
        Diem766 = diem766;
    }

    public static SoLieuBaoCaoTheoKy Create(string loaiThoiGian, string ky, string nam, string loaiThongKe, string? maDinhDanh, string soLieu, double? diem766)
    {
        return new SoLieuBaoCaoTheoKy(loaiThoiGian, ky, nam, loaiThongKe, maDinhDanh, soLieu, diem766);
    }

    public SoLieuBaoCaoTheoKy Update(string soLieu)
    {
        if (!string.IsNullOrEmpty(soLieu))
            SoLieu = soLieu.Trim();
        return this;
    }
}
