using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class ChiaSeTaiLieuKhoLuuTruCongDan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string SoDinhDanhChiaSe { get; set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string SoDinhDanhNhan { get; set; }
    public Guid TaiLieuLuuTruId { get; set; }
    public ChiaSeTaiLieuKhoLuuTruCongDan(string soDinhDanhChiaSe, string soDinhDanhNhan, Guid taiLieuLuuTruId)
    {
        SoDinhDanhChiaSe = soDinhDanhChiaSe;
        SoDinhDanhNhan = soDinhDanhNhan;
        TaiLieuLuuTruId = taiLieuLuuTruId;
    }

    public static ChiaSeTaiLieuKhoLuuTruCongDan Create(string soDinhDanhChiaSe, string soDinhDanhNhan, Guid taiLieuLuuTruId)
    {
        return new ChiaSeTaiLieuKhoLuuTruCongDan(soDinhDanhChiaSe, soDinhDanhNhan, taiLieuLuuTruId);
    }

    public ChiaSeTaiLieuKhoLuuTruCongDan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ChiaSeTaiLieuKhoLuuTruCongDan Restore()
    {
        DeletedOn = null;
        return this;
    }
}