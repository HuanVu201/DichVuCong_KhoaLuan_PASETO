using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace TD.DichVuCongApi.Domain.Catalog;
public class ThuTuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string IDQG { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaTTHC { get; private set; }
    [MaxLength(2000)]
    public string TenTTHC { get; private set; }
    public string GoiTinThuTucQG { get; private set; }
    [MaxLength(100)]
    public string LoaiTTHC { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string TrangThai { get; private set; }
    public bool? SuDung { get; private set; } = true;
    public bool? LaThuTucChungThuc { get; private set; } = false;
    [MaxLength(200)]
    public string LinhVucChinh { get; private set; }
    [MaxLength(50)]
    public string MaLinhVucChinh { get; private set; }
    [MaxLength(1000)]
    public string CoQuanThucHienChinh { get; private set; }
    [MaxLength(1000)]
    public string? CapThucHien { get; private set; }
    [MaxLength(100)]
    public string MaKetQuaChinh { get; private set; }
    [MaxLength(600)]
    public string TenKetQuaChinh { get; private set; }
    public string ThoiGianGiaiQuyet { get; private set; }
    [MaxLength(2000)]
    public string QuyetDinhCongBo { get; private set; }
    [MaxLength(2000)]
    public string? QuyetDinh { get; private set; }
    public DateTime? NgayCapNhat { get; private set; }
    public Guid? LinhVucId { get; private set; }
    public bool? TrangThaiPhiLePhi { get; private set; }
    [MaxLength(50)]
    public string? MucDo { get; private set; } = "2";
    public bool? LienThong { get; private set; } = false;
    public int? HoSoPhatSinhTrongNam { get; private set; } = 0;
    public int? ThuTu { get; private set; } = 0;
    public bool? LaTieuBieu { get; private set; } = false;
    public bool? ChoPhepLayFileTuTHPS { get; private set; } = false;
    [MaxLength(200)]
    public string? UrlVideoTutorial { get; set; }
    public bool? ThuTucKhongCoKetQua { get; set; }
    public bool? ThucHienTaiBoPhanMotCua { get; set; } = true;
    public string? DinhKemQuyetDinh { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DoiTuongThucHien { get; set; }
    public bool? LaPhiDiaGioi { get; set; } = false;
    public bool? LaThuTucLienThongDatDai { get; set; } = false;

    public ThuTuc() { }
    public ThuTuc(string iDQG, string maTTHC, string tenTTHC, string goiTinThuTucQG, string loaiTTHC, string trangThai, bool? suDung, string linhVucChinh,
        string maLinhVucChinh, string coQuanThucHienChinh, string capThucHien, string maKetQuaChinh,
        string tenKetQuaChinh, string thoiGianGiaiQuyet, string quyetDinhCongBo, DateTime? ngayCapNhat, Guid? linhVucId, bool? trangThaiPhiLePhi,
        string? mucDo, bool? lienThong, int? hoSoPhatSinhTrongNam, int? thuTu, bool? laTieuBieu, string? quyetDinh, bool? laThuTucChungThuc,
        bool? thucHienTaiBoPhanMotCua,string? dinhKemQuyetDinh, bool? laPhiDiaGioi, bool? laThuTucLienThongDatDai)
    {
        IDQG = iDQG;
        MaTTHC = maTTHC;
        TenTTHC = tenTTHC;
        GoiTinThuTucQG = goiTinThuTucQG;
        QuyetDinh = quyetDinh;
        LoaiTTHC = loaiTTHC;
        TrangThai = trangThai;
        SuDung = suDung;
        LinhVucChinh = linhVucChinh;
        MaLinhVucChinh = maLinhVucChinh;
        CoQuanThucHienChinh = coQuanThucHienChinh;
        CapThucHien = capThucHien;
        MaKetQuaChinh = maKetQuaChinh;
        TenKetQuaChinh = tenKetQuaChinh;
        ThucHienTaiBoPhanMotCua = thucHienTaiBoPhanMotCua;
        ThoiGianGiaiQuyet = thoiGianGiaiQuyet;
        QuyetDinhCongBo = quyetDinhCongBo;
        NgayCapNhat = ngayCapNhat;
        LinhVucId = linhVucId;
        TrangThaiPhiLePhi = trangThaiPhiLePhi;
        MucDo = mucDo;
        LienThong = lienThong;
        HoSoPhatSinhTrongNam = hoSoPhatSinhTrongNam;
        ThuTu = thuTu;
        LaTieuBieu = laTieuBieu;
        LaThuTucChungThuc = laThuTucChungThuc;
        DinhKemQuyetDinh = dinhKemQuyetDinh;
        LaPhiDiaGioi = laPhiDiaGioi;
        LaThuTucLienThongDatDai = laThuTucLienThongDatDai;
    }
    public static ThuTuc Create(string iDQG, string maTTHC, string tenTTHC, string goiTinThuTucQG, string loaiTTHC, string trangThai, bool? suDung, string linhVucChinh,
        string maLinhVucChinh, string coQuanThucHienChinh, string capThucHien, string maKetQuaChinh,
        string tenKetQuaChinh, string thoiGianGiaiQuyet, string quyetDinhCongBo, DateTime? ngayCapNhat, Guid? linhVucId, bool? trangThaiPhiLePhi,
        string? mucDo, bool? lienThong, int? hoSoPhatSinhTrongNam, int? thuTu, bool? laTieuBieu, string? quyetDinh, bool? laThuTucChungThuc, bool? thucHienTaiBoPhanMotCua,string? dinhKemQuyetDinh, bool? laPhiDiaGioi
        , bool? laThuTucLienThongDatDai = null)
    {
        return new(iDQG, maTTHC, tenTTHC, goiTinThuTucQG, loaiTTHC, trangThai, suDung, linhVucChinh, maLinhVucChinh, coQuanThucHienChinh, capThucHien, maKetQuaChinh,
         tenKetQuaChinh, thoiGianGiaiQuyet, quyetDinhCongBo, ngayCapNhat, linhVucId, trangThaiPhiLePhi,
         mucDo, lienThong, hoSoPhatSinhTrongNam, thuTu, laTieuBieu, quyetDinh, laThuTucChungThuc, thucHienTaiBoPhanMotCua,dinhKemQuyetDinh, laPhiDiaGioi, laThuTucLienThongDatDai);
    }
    public ThuTuc Update(string? iDQG, string? goiTinThuTucQG, bool? suDung
        , string? linhVucChinh, string? maLinhVucChinh, string? coQuanThucHienChinh, string? capThucHien, string? maKetQuaChinh,
        string? tenKetQuaChinh, DateTime? ngayCapNhat, bool? trangThaiPhiLePhi,
        string? mucDo, int? hoSoPhatSinhTrongNam, int? thuTu, bool? laTieuBieu, bool? choPhepLayFileTuTHPS, bool? laThuTucChungThuc, string? urlVideoTutorial,
        string? quyetDinh, bool? thucHienTaiBoPhanMotCua,string? dinhKemQuyetDinh , bool? laPhiDiaGioi, bool? thuTucKhongCoKetQua = null, bool? laThuTucLienThongDatDai = null)
    {
        if (!string.IsNullOrEmpty(iDQG) && !IDQG.Equals(iDQG))
            IDQG = iDQG;
        if (quyetDinh != null)
        {
            QuyetDinh = quyetDinh;
        }
        if (!string.IsNullOrEmpty(goiTinThuTucQG) && !IDQG.Equals(goiTinThuTucQG))
            GoiTinThuTucQG = goiTinThuTucQG;
        if (suDung != null)
            SuDung = (bool)suDung;
        if (laThuTucChungThuc != null)
            LaThuTucChungThuc = (bool)laThuTucChungThuc;
        if (laPhiDiaGioi != null)
            LaPhiDiaGioi = (bool)laPhiDiaGioi;
        if (thucHienTaiBoPhanMotCua != null)
            ThucHienTaiBoPhanMotCua = (bool)thucHienTaiBoPhanMotCua;
        if (!string.IsNullOrEmpty(linhVucChinh))
            LinhVucChinh = linhVucChinh;
        if (!string.IsNullOrEmpty(maLinhVucChinh))
            MaLinhVucChinh = maLinhVucChinh;
        if (!string.IsNullOrEmpty(coQuanThucHienChinh))
            CoQuanThucHienChinh = coQuanThucHienChinh;
        if (capThucHien != null)
        {
            CapThucHien = capThucHien;
        }
        if (!string.IsNullOrEmpty(maKetQuaChinh))
            MaKetQuaChinh = maKetQuaChinh;
        if (!string.IsNullOrEmpty(tenKetQuaChinh))
            TenKetQuaChinh = tenKetQuaChinh;
        NgayCapNhat = (DateTime)ngayCapNhat;
        if (trangThaiPhiLePhi != null)
            TrangThaiPhiLePhi = (bool)trangThaiPhiLePhi;
        if (!string.IsNullOrEmpty(mucDo))
            MucDo = mucDo;
        if (hoSoPhatSinhTrongNam != null)
            HoSoPhatSinhTrongNam = (int)hoSoPhatSinhTrongNam;
        if (thuTu != null) ThuTu = thuTu;
        if (laTieuBieu != null) LaTieuBieu = laTieuBieu;
        if (choPhepLayFileTuTHPS != null) ChoPhepLayFileTuTHPS = choPhepLayFileTuTHPS;
        if (!string.IsNullOrEmpty(urlVideoTutorial))
        {
            UrlVideoTutorial = urlVideoTutorial;
        }
        if (dinhKemQuyetDinh == null)
        {
            DinhKemQuyetDinh = null; 
        }
        else
        {
            DinhKemQuyetDinh = dinhKemQuyetDinh; // Cập nhật giá trị mới
        }
        if (thuTucKhongCoKetQua != null) ThuTucKhongCoKetQua = thuTucKhongCoKetQua;
        if (laThuTucLienThongDatDai != null) LaThuTucLienThongDatDai = laThuTucLienThongDatDai;
        return this;
    }
    public void Update(string mucDo)
    {
        if (!string.IsNullOrEmpty(mucDo))
            MucDo = mucDo;
    }
    public ThuTuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThuTuc Restore()
    {
        DeletedOn = null;
        return this;
    }
}
