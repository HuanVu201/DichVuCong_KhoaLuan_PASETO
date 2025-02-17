using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business;
public class PhieuKhaoSat : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? DonVi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? DonViText { get; private set; }
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
    [MaxLength(50)]
    public string? MaHoSo { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? HinhThucDanhGia { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? MucDoRHL { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? MucDoHL { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? MucDoBT { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? MucDoKHL { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? MucDoRKHL { get; private set; }
    public DateTime? NgayTao { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? NguoiNhapDanhGia { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? NguoiNhapDanhGiaText { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? LoaiNhom { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TongDiem { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? XepLoai { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? PhongBan { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? PhongBanText { get; private set; }
    public bool? HoanThanhDanhGia { get; private set; }

    public PhieuKhaoSat() { }
    public PhieuKhaoSat(string? donVi, string? donViText, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? maHoSo,string? hinhThucDanhGia, string? mucDoRHL,string? mucDoHL, string? mucDoBT,string? mucDoKHL,string? mucDoRKHL,DateTime? ngayTao,string? nguoiNhapDanhgia,string? nguoiNhapDanhGiaText,string? loaiNhom,string? phongBan, string? phongBanText,bool? hoanThanhDanhGia,string? tongDiem,string? xepLoai, string? traLoi10,string? traLoi11)
    {
        DonVi = donVi;
        DonViText = donViText;
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
        TraLoi11 = traLoi11;
        MaHoSo = maHoSo;
        HinhThucDanhGia = hinhThucDanhGia;
        MucDoRHL = mucDoRHL;
        MucDoHL = mucDoHL;
        MucDoBT = mucDoBT;
        MucDoKHL = mucDoKHL;
        MucDoRKHL = mucDoRKHL;
        NgayTao = ngayTao;
        NguoiNhapDanhGia = nguoiNhapDanhgia;
        NguoiNhapDanhGiaText = nguoiNhapDanhGiaText;
        LoaiNhom = loaiNhom;
        PhongBan = phongBanText;
        HoanThanhDanhGia = hoanThanhDanhGia;
        TongDiem = tongDiem;
        XepLoai = xepLoai;
    }

    public static PhieuKhaoSat Create(string? donVi, string? donViText, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? maHoSo, string? hinhThucDanhGia, string? mucDoRHL, string? mucDoHL, string? mucDoBT, string? mucDoKHL, string? mucDoRKHL, DateTime? ngayTao, string? nguoiNhapDanhgia, string? nguoiNhapDanhGiaText, string? loaiNhom, string? phongBan, string? phongBanText,bool? hoanThanhDanhGia,string? tongDiem,string? xepLoai, string? traLoi10, string? traLoi11)
    {
        return new PhieuKhaoSat(donVi, donViText, traLoi1, traLoi2, traLoi3,traLoi4,traLoi5,traLoi6,traLoi7,traLoi8,traLoi9,maHoSo,hinhThucDanhGia,mucDoRHL,mucDoHL,mucDoBT,mucDoKHL,mucDoRKHL,ngayTao,nguoiNhapDanhgia,nguoiNhapDanhGiaText,loaiNhom,phongBan,phongBanText,hoanThanhDanhGia,tongDiem,xepLoai,traLoi10,traLoi11);
    }

    public PhieuKhaoSat Update(string? donVi, string? donViText, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? maHoSo, string? hinhThucDanhGia, string? mucDoRHL, string? mucDoHL, string? mucDoBT, string? mucDoKHL, string? mucDoRKHL, DateTime? ngayTao, string? nguoiNhapDanhGia, string? nguoiNhapDanhGiaText, string? loaiNhom, string? phongBan, string? phongBanText,bool? hoanThanhDanhGia,string? tongDiem,string? xepLoai,string? traLoi10,string? traLoi11)
    {
        if (hoanThanhDanhGia != null)
            HoanThanhDanhGia = hoanThanhDanhGia;
        if (!string.IsNullOrEmpty(donVi) && !DonVi.Equals(donVi))
            DonVi = donVi;
        if (!string.IsNullOrEmpty(donViText) && !DonViText.Equals(donViText))
            DonViText = donViText;
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
        if (!string.IsNullOrEmpty(hinhThucDanhGia) && !HinhThucDanhGia.Equals(hinhThucDanhGia))
            HinhThucDanhGia = hinhThucDanhGia;
        if (!string.IsNullOrEmpty(mucDoRHL) && !MucDoRHL.Equals(mucDoRHL))
            MucDoRHL = mucDoRHL;
        if (!string.IsNullOrEmpty(mucDoHL) && !MucDoHL.Equals(mucDoHL))
            MucDoHL = mucDoHL;
        if (!string.IsNullOrEmpty(mucDoBT) && !MucDoBT.Equals(mucDoBT))
            MucDoBT = mucDoBT;
        if (!string.IsNullOrEmpty(mucDoKHL) && !MucDoKHL.Equals(mucDoKHL))
            MucDoKHL = mucDoKHL;
        if (!string.IsNullOrEmpty(mucDoRKHL) && !MucDoRKHL.Equals(mucDoRKHL)) 
            MucDoRKHL = mucDoRKHL;
        if (NgayTao != null)
            NgayTao = ngayTao;
        if (!string.IsNullOrEmpty(nguoiNhapDanhGia) && !NguoiNhapDanhGia.Equals(nguoiNhapDanhGia))
            NguoiNhapDanhGia = nguoiNhapDanhGia;
        if (!string.IsNullOrEmpty(nguoiNhapDanhGiaText) && !NguoiNhapDanhGiaText.Equals(nguoiNhapDanhGiaText))
            NguoiNhapDanhGiaText = nguoiNhapDanhGiaText;
        if (!string.IsNullOrEmpty(loaiNhom) && !LoaiNhom.Equals(loaiNhom))
            LoaiNhom = loaiNhom;
        if (!string.IsNullOrEmpty(phongBan))
            PhongBan = phongBan;
        if (!string.IsNullOrEmpty(phongBanText) && !PhongBanText.Equals(phongBanText))
            PhongBanText = phongBanText;
        if (!string.IsNullOrEmpty(tongDiem) && !TongDiem.Equals(tongDiem))
            TongDiem = tongDiem;
        if (!string.IsNullOrEmpty(xepLoai) && !XepLoai.Equals(xepLoai))
            XepLoai = xepLoai;
        return this;
    }

    public PhieuKhaoSat SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public PhieuKhaoSat Restore()
    {
        DeletedOn = null;
        return this;
    }

}
