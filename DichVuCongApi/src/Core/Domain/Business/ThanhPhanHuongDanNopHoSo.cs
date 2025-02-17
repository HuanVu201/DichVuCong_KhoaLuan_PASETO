using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business;
public class ThanhPhanHuongDanNopHoSo : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public DefaultIdType Id {  get;private set; }
    [MaxLength(4000)]
    public string? Ten { get; private set; }
    [MaxLength(50)]
    public string? HoSo { get; private set; }
    public int? SoBanChinh { get; private set; }
    public int? SoBanSao { get; private set; }
  
    public string? GhiChu { get; set; }
 
  
    public ThanhPhanHuongDanNopHoSo(string? ten, string? hoSo,  int? soBanChinh, int? soBanSao, string? ghiChu)
    {
        HoSo = hoSo;
        Ten = ten;
        SoBanChinh = soBanChinh;
        SoBanSao = soBanSao;
        GhiChu = ghiChu;
      
    }
       
 
    public static ThanhPhanHuongDanNopHoSo Create(string? ten, string? hoSo, int? soBanChinh, int? soBanSao, string? ghiChu)
    {
        return new ThanhPhanHuongDanNopHoSo(ten,hoSo,soBanChinh,soBanSao,ghiChu);
    }
    public ThanhPhanHuongDanNopHoSo Update(string? ten, string? hoSo, int? soBanChinh, int? soBanSao, string? ghiChu)
    {

        if(ten !=null) Ten = ten != string.Empty ? ten : null;
        if (hoSo != null) hoSo = hoSo != string.Empty ? hoSo : null;
        if (ghiChu != null) GhiChu = ghiChu != string.Empty ? ghiChu : null;
        if (soBanChinh != null)
            SoBanChinh = (int)soBanChinh;
        if (soBanSao != null)
            SoBanSao = (int)soBanSao;

        return this;
    }

  
    public ThanhPhanHuongDanNopHoSo SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThanhPhanHuongDanNopHoSo Restore()
    {
        DeletedOn = null;
        return this;
    }

}