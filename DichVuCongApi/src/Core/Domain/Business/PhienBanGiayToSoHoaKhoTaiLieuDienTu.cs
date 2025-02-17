using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class PhienBanGiayToSoHoaKhoTaiLieuDienTu : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(35)]
    [Column(TypeName = "varchar")]
    public string SoDinhDanh { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    [MaxLength(100)]
    public string? MaHoSo { get; set; }
    [MaxLength(2000)]
    public string? DinhKem { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? MaGiayTo { get; set; }
    public double? DungLuong { get; set; }

    public PhienBanGiayToSoHoaKhoTaiLieuDienTu() { }
    public PhienBanGiayToSoHoaKhoTaiLieuDienTu(string soDinhDanh, string? khoTaiLieuDienTuId, string? maHoSo, string? dinhKem, string? maGiayTo, double? dungLuong)
    {
        SoDinhDanh = soDinhDanh;
        KhoTaiLieuDienTuId = khoTaiLieuDienTuId;
        MaHoSo = maHoSo;
        DinhKem = dinhKem;
        MaGiayTo = maGiayTo;
        DungLuong = dungLuong;
    }
    public static PhienBanGiayToSoHoaKhoTaiLieuDienTu Create(string soDinhDanh, string? khoTaiLieuDienTuId, string? maHoSo, string? dinhKem, string? maGiayTo, double? dungLuong)
    {
        return new PhienBanGiayToSoHoaKhoTaiLieuDienTu(soDinhDanh, khoTaiLieuDienTuId, maHoSo, dinhKem, maGiayTo, dungLuong);
    }

    public PhienBanGiayToSoHoaKhoTaiLieuDienTu Update( string? khoTaiLieuDienTuId, string? maHoSo, string? dinhKem, string? maGiayTo, double? dungLuong)
    {
        if (!string.IsNullOrEmpty(khoTaiLieuDienTuId))
        {
            KhoTaiLieuDienTuId = khoTaiLieuDienTuId;
        }

        MaGiayTo = !string.IsNullOrEmpty(maHoSo) ? maHoSo : MaHoSo;
        DinhKem = !string.IsNullOrEmpty(dinhKem) ? dinhKem : DinhKem;
        MaGiayTo = !string.IsNullOrEmpty(maGiayTo) ? maGiayTo : MaGiayTo;
        if (dungLuong.HasValue)
        {
            DungLuong = dungLuong;
        }

        return this;
    }

    public PhienBanGiayToSoHoaKhoTaiLieuDienTu SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public PhienBanGiayToSoHoaKhoTaiLieuDienTu Restore()
    {
        DeletedOn = null;
        return this;
    }

}
