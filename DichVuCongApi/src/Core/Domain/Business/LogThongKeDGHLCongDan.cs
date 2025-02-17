using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business;
public class LogThongKeDGHLCongDan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? DonVi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NgayTao { get; private set; }
    [MaxLength(50)]
    public string? MaHoSo { get; private set; }
    [MaxLength(100)]
    [Column(TypeName = "nvarchar")]
    public string? NguoiDanhGia { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi1 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi2 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi3 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi4 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi5 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi6 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi7 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi8 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi9 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi10 { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TraLoi11 { get; private set; }
    public bool? HoanThanhDanhGia { get; private set; }
    public LogThongKeDGHLCongDan() { }
    public LogThongKeDGHLCongDan(string? donVi, string? ngayTao,string? maHoSo, string? nguoiDanhGia, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9,  string? traLoi10, string? traLoi11,bool? hoanThanhDanhGia)
    {
        DonVi = donVi;
        NgayTao = ngayTao;
        MaHoSo = maHoSo;
        NguoiDanhGia = nguoiDanhGia;
        TraLoi1 = traLoi1;
        TraLoi2 = traLoi2;
        TraLoi3 = traLoi3;
        TraLoi4 = traLoi4;
        TraLoi5 = traLoi5;
        TraLoi6 = traLoi6;
        TraLoi7 = traLoi7;
        TraLoi8 = traLoi8;
        TraLoi9 = traLoi9;
        TraLoi10 = traLoi10;
        TraLoi11= traLoi11;
        HoanThanhDanhGia = hoanThanhDanhGia;
    }

    public LogThongKeDGHLCongDan Update(string? donVi, string? ngayTao, string? maHoSo, string? nguoiDanhGia, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? traLoi10, string? traLoi11, bool? hoanThanhDanhGia)
    {
        if (hoanThanhDanhGia != null)
            HoanThanhDanhGia = hoanThanhDanhGia;
        if (!string.IsNullOrEmpty(donVi) && !DonVi.Equals(donVi))
            DonVi = donVi;
        if (!string.IsNullOrEmpty(traLoi1) && !TraLoi1.Equals(traLoi1))
            TraLoi1 = traLoi1;
        if (!string.IsNullOrEmpty(traLoi2) && !TraLoi2.Equals(traLoi2))
            TraLoi2 = traLoi2;
        if (!string.IsNullOrEmpty(traLoi3) && !TraLoi3.Equals(traLoi3))
            TraLoi3 = traLoi3;
        if (!string.IsNullOrEmpty(traLoi4) && !TraLoi4.Equals(traLoi4))
            TraLoi4 = traLoi4;
        if (!string.IsNullOrEmpty(traLoi5) && !TraLoi5.Equals(traLoi5))
            TraLoi5 = traLoi5;
        if (!string.IsNullOrEmpty(traLoi6) && !TraLoi6.Equals(traLoi6))
            TraLoi6 = traLoi6;
        if (!string.IsNullOrEmpty(traLoi7) && !TraLoi7.Equals(traLoi7))
            TraLoi7 = TraLoi7;
        if (!string.IsNullOrEmpty(traLoi8) && !TraLoi8.Equals(traLoi8))
            TraLoi8 = traLoi8;
        if (!string.IsNullOrEmpty(traLoi9) && !TraLoi9.Equals(traLoi9))
            TraLoi9 = traLoi9;
        if (!string.IsNullOrEmpty(traLoi10) && !TraLoi10.Equals(traLoi10))
            TraLoi10 = traLoi10;
        if (!string.IsNullOrEmpty(traLoi11) && !TraLoi11.Equals(traLoi11))
            TraLoi11 = traLoi11;
        if (!string.IsNullOrEmpty(maHoSo) && !MaHoSo.Equals(maHoSo))
            MaHoSo = maHoSo;
        if (NgayTao != null)
            NgayTao = ngayTao;
        return this;
    }
    public static LogThongKeDGHLCongDan Create(string? donVi, string? ngayTao, string? maHoSo, string? nguoiDanhGia, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? traLoi10, string? traLoi11,bool? hoanThanhDanhGia)
    {
        return new LogThongKeDGHLCongDan(donVi,ngayTao,maHoSo,nguoiDanhGia, traLoi1, traLoi2, traLoi3, traLoi4, traLoi5, traLoi6, traLoi7, traLoi8, traLoi9, traLoi10,traLoi11,hoanThanhDanhGia);
    }

}
