using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class DanhGiaCoQuan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    [Column(TypeName = "nvarchar")]
    public string? DonVi { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "nvarchar")]
    public string? DonViText { get; private set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? MaNhomCha { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "nvarchar")]
    public string? MaNhomChaText { get; private set; }
    public bool? DongBo { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? Quy { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? Nam { get; private set; }
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
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? SoPhieu { get; private set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TongDiem { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? PhongBan { get; private set; }
    [MaxLength(150)]
    [Column(TypeName = "nvarchar")]
    public string? LyDoTruDiem { get; private set; }
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
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi1 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi2 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi3 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi4 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi5 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi6 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi7 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi8 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi9 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi10 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? ThamDinhTraLoi11 { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? XepLoai { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "nvarchar")]
    public string? XepHang { get; private set; }
    public bool? TongDonViCon { get; private set; }
    public DanhGiaCoQuan() { }
    public DanhGiaCoQuan(string? donVi, string? donViText, string? maNhomCha, string? maNhomChaText, bool? dongBo, string? quy, string? nam, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? soPhieu, string? tongDiem, string? phongBan, string? lyDoTruDiem, string? maHoSo, string? hinhThucDanhGia, string? mucDoRHL, string? mucDoHL, string? mucDoBT, string? mucDoKHL, string? mucDoRKHL, string? thamDinhTraLoi1, string? thamDinhTraLoi2, string? thamDinhTraLoi3, string? thamDinhTraLoi4, string? thamDinhTraLoi5, string? thamDinhTraLoi6, string? thamDinhTraLoi7, string? thamDinhTraLoi8, string? thamDinhTraLoi9, string? xepLoai, string? xepHang, bool? tongDonViCon, string? traLoi10, string? traLoi11, string? thamDinhTraLoi10, string? thamDinhTraLoi11)
    {
        DonVi = donVi;
        DonViText = donViText;
        MaNhomCha = maNhomCha;
        MaNhomChaText = maNhomChaText;
        DongBo = dongBo;
        Quy = quy;
        Nam = nam;
        SoPhieu = soPhieu;
        TongDiem = tongDiem;
        PhongBan = phongBan;
        LyDoTruDiem = lyDoTruDiem;
        MaHoSo = maHoSo;
        HinhThucDanhGia = hinhThucDanhGia;
        MucDoRHL = mucDoRHL;
        MucDoHL = mucDoHL;
        MucDoBT = mucDoBT;
        MucDoKHL = mucDoKHL;
        MucDoRKHL = mucDoRKHL;
        ThamDinhTraLoi1 = thamDinhTraLoi1;
        ThamDinhTraLoi2 = thamDinhTraLoi2;
        ThamDinhTraLoi3 = thamDinhTraLoi3;
        ThamDinhTraLoi4 = thamDinhTraLoi4;
        ThamDinhTraLoi5 = thamDinhTraLoi5;
        ThamDinhTraLoi6 = thamDinhTraLoi6;
        ThamDinhTraLoi7 = thamDinhTraLoi7;
        ThamDinhTraLoi8 = thamDinhTraLoi8;
        ThamDinhTraLoi9 = thamDinhTraLoi9;
        TraLoi1 = traLoi1;
        TraLoi2 = traLoi2;
        TraLoi3 = traLoi3;
        TraLoi4 = traLoi4;
        TraLoi5 = traLoi5;
        TraLoi6 = traLoi6;
        TraLoi7 = traLoi7;
        TraLoi8 = traLoi8;
        TraLoi9 = traLoi9;
        XepLoai = xepLoai;
        XepHang = xepHang;
        TongDonViCon = tongDonViCon;
        TraLoi10 = traLoi10;
        TraLoi11 = traLoi11;
        ThamDinhTraLoi10 = thamDinhTraLoi10;
        ThamDinhTraLoi11 = thamDinhTraLoi11;
    }
    public static DanhGiaCoQuan Create(string? donVi, string? donViText, string? maNhomCha, string? maNhomChaText, bool? dongBo, string? quy, string? nam, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? soPhieu, string? tongDiem, string? phongBan, string? lyDoTruDiem, string? maHoSo, string? hinhThucDanhGia, string? mucDoRHL, string? mucDoHL, string? mucDoBT, string? mucDoKHL, string? mucDoRKHL, string? thamDinhTraLoi1, string? thamDinhTraLoi2, string? thamDinhTraLoi3, string? thamDinhTraLoi4, string? thamDinhTraLoi5, string? thamDinhTraLoi6, string? thamDinhTraLoi7, string? thamDinhTraLoi8, string? thamDinhTraLoi9, string? xepLoai, string? xepHang, bool? tongDonViCon, string? traLoi10, string? traLoi11, string? thamDinhTraLoi10, string? thamDinhTraLoi11)
    {
        return new DanhGiaCoQuan(donVi, donViText, maNhomCha, maNhomChaText, dongBo, quy, nam, traLoi1, traLoi2, traLoi3, traLoi4, traLoi5, traLoi6, traLoi7, traLoi8, traLoi9, soPhieu, tongDiem, phongBan, lyDoTruDiem, maHoSo, hinhThucDanhGia, mucDoRHL, mucDoHL, mucDoBT, mucDoKHL, mucDoRKHL, thamDinhTraLoi1, thamDinhTraLoi2, thamDinhTraLoi3, thamDinhTraLoi4, thamDinhTraLoi5, thamDinhTraLoi6, thamDinhTraLoi7, thamDinhTraLoi8, thamDinhTraLoi9, xepLoai, xepHang, tongDonViCon, traLoi10, traLoi11, thamDinhTraLoi10, thamDinhTraLoi11);
    }
    public DanhGiaCoQuan Update(string? donVi, string? donViText, string? maNhomCha, string? maNhomChaText, bool? dongBo, string? quy, string? nam, string? traLoi1, string? traLoi2, string? traLoi3, string? traLoi4, string? traLoi5, string? traLoi6, string? traLoi7, string? traLoi8, string? traLoi9, string? soPhieu, string? tongDiem, string? phongBan, string? lyDoTruDiem, string? maHoSo, string? hinhThucDanhGia, string? mucDoRHL, string? mucDoHL, string? mucDoBT, string? mucDoKHL, string? mucDoRKHL, string? thamDinhTraLoi1, string? thamDinhTraLoi2, string? thamDinhTraLoi3, string? thamDinhTraLoi4, string? thamDinhTraLoi5, string? thamDinhTraLoi6, string? thamDinhTraLoi7, string? thamDinhTraLoi8, string? thamDinhTraLoi9, string? xepLoai, string? xepHang, bool? tongDonViCon, string? traLoi10, string? traLoi11, string? thamDinhTraLoi10, string? thamDinhTraLoi11)
    {
        if (!string.IsNullOrEmpty(donVi))
            DonVi = donVi;
        if (!string.IsNullOrEmpty(donViText))
            DonViText = donViText;
        if (!string.IsNullOrEmpty(maNhomCha))
            MaNhomCha = maNhomCha;
        if (!string.IsNullOrEmpty(maNhomChaText))
            MaNhomCha = maNhomCha;
        if (!string.IsNullOrEmpty(quy))
            Quy = quy;
        if (!string.IsNullOrEmpty(nam))
            Nam = nam;
        if (!string.IsNullOrEmpty(lyDoTruDiem))
            LyDoTruDiem = lyDoTruDiem;
        if (!string.IsNullOrEmpty(soPhieu))
            SoPhieu = soPhieu;
        if (!string.IsNullOrEmpty(tongDiem))
            TongDiem = tongDiem;
        if (!string.IsNullOrEmpty(xepLoai))
            XepLoai = xepLoai;
        if (!string.IsNullOrEmpty(xepHang))
            XepHang = xepHang;
        if (dongBo != null)
            DongBo = dongBo;
        if (tongDonViCon != null)
            TongDonViCon = tongDonViCon;
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
            TraLoi7 = traLoi7;
        if (!string.IsNullOrEmpty(traLoi8) && !TraLoi8.Equals(traLoi8))
            TraLoi8 = traLoi8;
        if (!string.IsNullOrEmpty(traLoi9) && !TraLoi9.Equals(traLoi9))
            TraLoi9 = traLoi9;
        if (!string.IsNullOrEmpty(traLoi10) && !TraLoi10.Equals(traLoi10))
            TraLoi10 = traLoi10;
        if (!string.IsNullOrEmpty(traLoi11) && !TraLoi11.Equals(traLoi11))
            TraLoi11 = traLoi11;
        if (!string.IsNullOrEmpty(thamDinhTraLoi1))
            ThamDinhTraLoi1 = thamDinhTraLoi1;
        if (!string.IsNullOrEmpty(thamDinhTraLoi2))
            ThamDinhTraLoi2 = thamDinhTraLoi2;
        if (!string.IsNullOrEmpty(thamDinhTraLoi3))
            ThamDinhTraLoi3 = thamDinhTraLoi3;
        if (!string.IsNullOrEmpty(thamDinhTraLoi4))
            ThamDinhTraLoi4 = thamDinhTraLoi4;
        if (!string.IsNullOrEmpty(thamDinhTraLoi5))
            ThamDinhTraLoi5 = thamDinhTraLoi5;
        if (!string.IsNullOrEmpty(thamDinhTraLoi6))
            ThamDinhTraLoi6 = thamDinhTraLoi6;
        if (!string.IsNullOrEmpty(thamDinhTraLoi7))
            ThamDinhTraLoi7 = thamDinhTraLoi7;
        if (!string.IsNullOrEmpty(thamDinhTraLoi8))
            ThamDinhTraLoi8 = thamDinhTraLoi8;
        if (!string.IsNullOrEmpty(thamDinhTraLoi9))
            ThamDinhTraLoi9 = thamDinhTraLoi9;
        if (!string.IsNullOrEmpty(thamDinhTraLoi10))
            ThamDinhTraLoi10 = thamDinhTraLoi10;
        if (!string.IsNullOrEmpty(thamDinhTraLoi11))
            ThamDinhTraLoi11 = thamDinhTraLoi11;
        if (!string.IsNullOrEmpty(maHoSo))
            MaHoSo = maHoSo;
        if (!string.IsNullOrEmpty(hinhThucDanhGia))
            HinhThucDanhGia = hinhThucDanhGia;
        if (!string.IsNullOrEmpty(mucDoRHL))
            MucDoRHL = mucDoRHL;
        if (!string.IsNullOrEmpty(mucDoHL))
            MucDoHL = mucDoHL;
        if (!string.IsNullOrEmpty(mucDoBT))
            MucDoBT = mucDoBT;
        if (!string.IsNullOrEmpty(mucDoKHL))
            MucDoKHL = mucDoKHL;
        if (!string.IsNullOrEmpty(mucDoRKHL))
            MucDoRKHL = mucDoRKHL;
        if (!string.IsNullOrEmpty(phongBan))
            PhongBan = phongBan;

        return this;
    }

    public DanhGiaCoQuan UpdateSoPhieuVaMucDoHL(string? tongSoPhieu)
    {
        //, string? mucDoRHL, string? mucDoHL, string? mucDoKHL
        if (tongSoPhieu != null)
            SoPhieu = tongSoPhieu;
  /*      if (mucDoRHL != null)
            MucDoRHL = mucDoRHL;
        if(mucDoHL != null)
            MucDoHL = mucDoHL;
        if(mucDoKHL != null)
            MucDoKHL = mucDoKHL;*/
        return this;
    }
    public DanhGiaCoQuan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DanhGiaCoQuan Restore()
    {
        DeletedOn = null;
        return this;
    }

}
