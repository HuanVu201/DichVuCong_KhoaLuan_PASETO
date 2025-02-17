using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business;
public class GiayToSoHoa : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(2000)]
    public string? Ten { get; private set; }
    [MaxLength(200)]
    public string? Ma { get; private set; }
    [MaxLength(50)]
    public string? MaHoSo { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaGiayToKhoQuocGia { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDinhDanh { get; private set; } // số định danh
    [MaxLength(60)]
    [Column(TypeName = "varchar")]
    public string? SoKyHieu { get; private set; }
    [MaxLength(200)]
    public string? MaGiayTo { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViId { get; private set; }
    public string? NguoiSoHoa { get; private set; }
    public DateTime? ThoiGianSoHoa { get; private set; }
    public DateTime? ThoiHanHieuLuc { get; private set; }
    public DateTime? NgayBanHanh { get; private set; }
    [MaxLength(200)]
    public string? PhamViHieuLuc { get; private set; }
    [MaxLength(1000)]
    public string? TrichYeuNoiDung { get; private set; }
    [MaxLength(200)]
    public string? CoQuanBanHanh { get; private set; }
    [MaxLength(50)]
    public string? NguoiKy { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? LoaiSoHoa { get; private set; }
    [MaxLength(1200)]
    public string? DinhKem { get; private set; }

    public bool? ThoiHanVinhVien { get; private set; }
    public string? JsonOcr { get; private set; }
    /// <summary>
    /// Ẩn giấy tờ đối với công dân khi loaiGiayTo = 1 (số hóa kết quả)
    /// </summary>
    public bool? AnGiayTo { get; private set; }
    public string? KhoTaiLieuDienTuId { get; private set; }
    public DateTime? NgayCapNhatKho { get; set; }
    public double? DungLuong { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiSoHoa { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaTTHC { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaLinhVuc { get; set; }
    [MaxLength(500)]
    public string? ChuGiayTo { get; set; }

    public GiayToSoHoa() { }
    public GiayToSoHoa(string? ten, string? ma, string? maGiayToKhoQuocGia, string? maDinhDanh, string? maGiayTo, string? donViId, string? nguoiSoHoa, DateTime? thoiGianSoHoa,
        DateTime? thoiHanHieuLuc, DateTime? ngayBanHanh, string? phamViHieuLuc, string? trichYeuNoiDung, string? coQuanBanHanh, string? nguoiKy, string? loaiSoHoa, string? dinhKem,
        string? soKyHieu, bool? thoiHanVinhVien, string? jsonOcr, string? maHoSo, bool? anGiayTo)
    {
        Ten = ten;
        Ma = ma;
        MaGiayToKhoQuocGia = maGiayToKhoQuocGia;
        MaDinhDanh = maDinhDanh;
        MaGiayTo = maGiayTo;
        DonViId = donViId;
        NguoiSoHoa = nguoiSoHoa;
        ThoiGianSoHoa = thoiGianSoHoa;
        ThoiHanHieuLuc = thoiHanHieuLuc;
        NgayBanHanh = ngayBanHanh;
        PhamViHieuLuc = phamViHieuLuc;
        TrichYeuNoiDung = trichYeuNoiDung;
        CoQuanBanHanh = coQuanBanHanh;
        NguoiKy = nguoiKy;
        LoaiSoHoa = loaiSoHoa;
        DinhKem = dinhKem;
        SoKyHieu = soKyHieu;
        ThoiHanVinhVien = thoiHanVinhVien;
        JsonOcr = jsonOcr;
        MaHoSo = maHoSo;
        AnGiayTo = anGiayTo;
    }
    public static GiayToSoHoa Create(string? ten, string? ma, string? maGiayToKhoQuocGia, string? maDinhDanh, string? maGiayTo, string? donViId, string? nguoiSoHoa, DateTime? thoiGianSoHoa,
        DateTime? thoiHanHieuLuc, DateTime? ngayBanHanh, string? phamViHieuLuc, string? trichYeuNoiDung, string? coQuanBanHanh, string? nguoiKy, string? loaiSoHoa, string? dinhKem, string? soKyHieu, bool? thoiHanVinhVien, string? jsonOcr, string? maHoSo, bool? anGiayTo)
    {
        return new(ten, ma, maGiayToKhoQuocGia, maDinhDanh, maGiayTo, donViId, nguoiSoHoa, thoiGianSoHoa, thoiHanHieuLuc, ngayBanHanh, phamViHieuLuc, trichYeuNoiDung, coQuanBanHanh, nguoiKy, loaiSoHoa, dinhKem, soKyHieu, thoiHanVinhVien, jsonOcr, maHoSo, anGiayTo);
    }
    public GiayToSoHoa Update(string? ten, string? ma, string? maGiayToKhoQuocGia, string? maDinhDanh, string? maGiayTo, string? donViId, string? nguoiSoHoa, DateTime? thoiGianSoHoa,
        DateTime? thoiHanHieuLuc, DateTime? ngayBanHanh, string? phamViHieuLuc, string? trichYeuNoiDung, string? coQuanBanHanh, string? nguoiKy, string? loaiSoHoa, string? dinhKem, string? soKyHieu, bool? thoiHanVinhVien, string? jsonOcr, string? maHoSo)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(maGiayToKhoQuocGia) && !MaGiayToKhoQuocGia.Equals(maGiayToKhoQuocGia))
            MaGiayToKhoQuocGia = maGiayToKhoQuocGia;
        if (!string.IsNullOrEmpty(maDinhDanh) && !MaDinhDanh.Equals(maDinhDanh))
            MaDinhDanh = maDinhDanh;
        if (!string.IsNullOrEmpty(maGiayTo) && !MaGiayTo.Equals(maGiayTo))
            MaGiayTo = maGiayTo;
        if (!string.IsNullOrEmpty(donViId) && !DonViId.Equals(donViId))
            DonViId = donViId;
        if (!string.IsNullOrEmpty(nguoiSoHoa) && !NguoiSoHoa.Equals(nguoiSoHoa))
            NguoiSoHoa = nguoiSoHoa;
        if (!string.IsNullOrEmpty(phamViHieuLuc) && !PhamViHieuLuc.Equals(phamViHieuLuc))
            PhamViHieuLuc = phamViHieuLuc;
        if (!string.IsNullOrEmpty(trichYeuNoiDung) && !TrichYeuNoiDung.Equals(trichYeuNoiDung))
            TrichYeuNoiDung = trichYeuNoiDung;
        if (!string.IsNullOrEmpty(coQuanBanHanh) && !CoQuanBanHanh.Equals(coQuanBanHanh))
            CoQuanBanHanh = coQuanBanHanh;
        if (!string.IsNullOrEmpty(nguoiKy) && !NguoiKy.Equals(nguoiKy))
            NguoiKy = nguoiKy;
        if (!string.IsNullOrEmpty(loaiSoHoa) && !LoaiSoHoa.Equals(loaiSoHoa))
            LoaiSoHoa = loaiSoHoa;
        if (!string.IsNullOrEmpty(dinhKem) && !DinhKem.Equals(dinhKem))
            DinhKem = dinhKem;
        if (soKyHieu != null)
            SoKyHieu = soKyHieu;
        if (jsonOcr != null)
            JsonOcr = jsonOcr;
        if (maHoSo != null)
            MaHoSo = maHoSo;
        if (thoiHanVinhVien != null)
            ThoiHanVinhVien = thoiHanVinhVien;
        if (ThoiHanVinhVien == true)
        {
            ThoiHanHieuLuc = null;
        }
        else
        {
            ThoiHanHieuLuc = thoiHanHieuLuc;
        }
        ThoiGianSoHoa = thoiGianSoHoa;
        NgayBanHanh = ngayBanHanh;
        return this;
    }

    public GiayToSoHoa UpdateKhoTaiLieuDienTu(string? khoTaiLieuDienTuId, double? dungLuong, DateTime? ngayCapNhatKho)
    {
        KhoTaiLieuDienTuId = khoTaiLieuDienTuId;
        DungLuong = dungLuong;
        NgayCapNhatKho = ngayCapNhatKho;

        return this;
    }

    public void SetChuGiayTo(string? chuGiayTo)
    {
        if(chuGiayTo != null)
        {
            ChuGiayTo = chuGiayTo;
        }
    }

    public GiayToSoHoa SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public void SetThongTinSoHoaKetQua(string? trangThaiSoHoa, string? maTTHC, string? maLinhVuc)
    {
        if (!string.IsNullOrEmpty(trangThaiSoHoa))
            TrangThaiSoHoa = trangThaiSoHoa;
        if (!string.IsNullOrEmpty(maTTHC))
            MaTTHC = maTTHC;
        if (!string.IsNullOrEmpty(maLinhVuc))
            MaLinhVuc = maLinhVuc;
    }

    public GiayToSoHoa Restore()
    {
        DeletedOn = null;
        return this;
    }
    public static class TrangThaiSoHoaHoSo
    {
        public const string ChoDuyet = "1";
        public const string DaDuyet = "2";
        public const string KhongDuyet = "3";
    }
    public static class GiayToSoHoa_LoaiSoHoa
    {
        public const string KetQua = "1";
        public const string ThanhPhan = "0";
    }

}
