using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Portal;
public class HuongDanSuDung : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public string TenHuongDanSuDung { get; private set; }

    public string? NoiDungHuongDanSuDung { get; private set; }
    public int? ThuTu { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }

    public HuongDanSuDung() { }
    public HuongDanSuDung(string tenHuongDanSuDung, string noiDungHuongDanSuDung, int thuTu)
    {
        TenHuongDanSuDung = tenHuongDanSuDung;
        NoiDungHuongDanSuDung = noiDungHuongDanSuDung;
        ThuTu = thuTu
;
    }


    public static HuongDanSuDung Create(string tenHuongDanSuDung, string noiDungHuongDanSuDung, int thuTu)
    {
        return new(tenHuongDanSuDung, noiDungHuongDanSuDung, thuTu);
    }

    public HuongDanSuDung Update(string? tenHuongDanSuDung, string? noiDungHuongDanSuDung, int? thuTu)
    {
        if (!string.IsNullOrEmpty(tenHuongDanSuDung) && !TenHuongDanSuDung.Equals(tenHuongDanSuDung))
            TenHuongDanSuDung = tenHuongDanSuDung;
        if (!string.IsNullOrEmpty(noiDungHuongDanSuDung) && !NoiDungHuongDanSuDung.Equals(noiDungHuongDanSuDung))
            NoiDungHuongDanSuDung = noiDungHuongDanSuDung;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        return this;
    }
    public HuongDanSuDung SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public HuongDanSuDung Restore()
    {
        DeletedOn = null;
        return this;
    }
}
