using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class KhoLuuTruCongDan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string SoDinhDanh { get; set; }
    public double? TongDungLuong { get; set; }
    public int? SoLuong { get; set; }
    public KhoLuuTruCongDan(string soDinhDanh, double? tongDungLuong, int? soLuong)
    {
        SoDinhDanh = soDinhDanh;
        TongDungLuong = tongDungLuong;
        SoLuong = soLuong;
    }
    public KhoLuuTruCongDan() { }
    public static KhoLuuTruCongDan Create(string soDinhDanh, double? tongDungLuong, int? soLuong)
    {
        return new KhoLuuTruCongDan(soDinhDanh, tongDungLuong, soLuong);
    }

    public KhoLuuTruCongDan Update(double? dungLuongReq, int? soLuong)
    {
        if (dungLuongReq.HasValue)
        {
            TongDungLuong += dungLuongReq;
        }

        if (soLuong.HasValue)
        {
            SoLuong += soLuong;
        }

        return this;
    }

    public KhoLuuTruCongDan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KhoLuuTruCongDan Restore()
    {
        DeletedOn = null;
        return this;
    }

}
