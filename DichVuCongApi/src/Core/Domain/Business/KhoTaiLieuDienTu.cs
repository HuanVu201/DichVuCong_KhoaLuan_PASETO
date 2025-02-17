using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business;
public class KhoTaiLieuDienTu : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(35)]
    [Column(TypeName = "varchar")]
    public string SoDinhDanh { get; set; }
    [MaxLength(200)]
    public string? TenKhoTaiLieu { get; set; }
    [MaxLength(2000)]
    public string? MoTa { get; set; }
    public double? DungLuong { get; set; }
    public int? SoLuong { get; set; }

    public KhoTaiLieuDienTu() { }
    public KhoTaiLieuDienTu(string soDinhDanh, string? tenKhoTaiLieu, string? moTa, double? dungLuong, int? soLuong)
    {
        SoDinhDanh = soDinhDanh;
        TenKhoTaiLieu = tenKhoTaiLieu;
        MoTa = moTa;
        DungLuong = dungLuong;
        SoLuong = soLuong;
    }
    public static KhoTaiLieuDienTu Create(string soDinhDanh, string tenKhoTaiLieu, string? moTa, double? dungLuong, int? soLuong)
    {
        return new KhoTaiLieuDienTu(soDinhDanh, tenKhoTaiLieu, moTa, dungLuong, soLuong);
    }

    public KhoTaiLieuDienTu Update( string? tenKhoTaiLieu, string? moTa, double? dungLuong, int? soLuong)
    {
        TenKhoTaiLieu = !string.IsNullOrEmpty(tenKhoTaiLieu) ? tenKhoTaiLieu : TenKhoTaiLieu;
        MoTa = !string.IsNullOrEmpty(moTa) ? moTa : MoTa;
        if (dungLuong.HasValue)
        {
            DungLuong += dungLuong;
        }

        if (soLuong.HasValue)
        {
            SoLuong += soLuong;
        }

        return this;
    }

    public KhoTaiLieuDienTu SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KhoTaiLieuDienTu Restore()
    {
        DeletedOn = null;
        return this;
    }

}
