using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class YeuCauThanhToan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string Ma { get; private set; }
    public int SoTien { get; private set; }
    public int Phi { get; private set; }
    public int LePhi { get; private set; }
    [MaxLength(100)]
    public string? TrangThai { get; private set; }
    public DateTime? NgayYeuCau { get; private set; }
    public string? NguoiYeuCau { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViThu { get; private set; }
    [MaxLength(50)]
    public string? HinhThucThanhToan { get; private set; }
    [MaxLength(50)]
    public string HinhThucThu { get; private set; }
    public string? ChiTiet { get; private set; }
    public string? GhiChuThanhToan { get; private set; }
    [MaxLength(100)]
    public string? MauSoBienLai { get; private set; }
    [MaxLength(100)]
    public string? KyHieuBienLai { get; private set; }
    [MaxLength(100)]
    public string? SoBienLai { get; private set; }
    [MaxLength(100)]
    public string? SoBienLaiLePhi { get; private set; }
    [MaxLength(100)]
    public string? SoBienLaiPhi { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? NguoiThuPhi { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? DuongDanBienLai { get; private set; }
    public DateTime? NgayThuPhi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViThuPhiMaSoThue { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViMaSoThue { get; private set; }
    public DateTime? NgayHoanPhi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiHoanPhi { get; private set; }
    [MaxLength(255)]
    public string? LyDoHoanPhi { get; private set; }
    public DateTime? NgayHuy { get; private set; }
    public DateTime? NgayLapHoaDonPhi { get; private set; }
    public DateTime? NgayLapHoaDonLePhi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiHuy { get; private set; }
    [MaxLength(255)]
    public string? LyDoHuy { get; private set; }
    public string? DonVi { get; private set; }
    [MaxLength(1000)]
    public string? NguoiNopTienBienLai { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaSoThueBienLai { get; private set; }
    [MaxLength(2000)]
    public string? DiaChiBienLai { get; private set; }
    [MaxLength(2000)]
    public string? TenPhiBienLai { get; private set; }
    [MaxLength(2000)]
    public string? TenLePhiBienLai { get; private set; }
    [MaxLength(200)]
    public string? SoTaiKhoanHoanPhi { get; private set; }
    [MaxLength(500)]
    public string? TenTaiKhoanHoanPhi { get; private set; }
    [MaxLength(500)]
    public string? TenNganHangHoanPhi { get; private set; }
    [MaxLength(20)]
    public string? SoGiayToNguoiNopTienBienLai { get; private set; }
    [MaxLength(500)]
    public string? EmailNguoiNopTienBienLai { get; private set; }
    [MaxLength(20)]
    public string? SoDienThoaiNguoiNopTienBienLai { get; private set; }
    [MaxLength(100)]
    public string? MaNganHangGiaoDich { get; private set; }
    [MaxLength(100)]
    public string? MaGiaoDich { get; private set; }
    [MaxLength(200)]
    public string? DoiTacThanhToan { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? MaThamChieuGiaoDich { get; private set; }
    public YeuCauThanhToan() { }

    // hồ sơ trực tuyến yêu cầu thu phí
    public YeuCauThanhToan(string? maHoSo, int soTien, int phi, int lePhi, string trangThai, DateTime ngayYeuCau, string nguoiYeuCau, string donViThu,
        string hinhThucThu, string chiTiet, string? donVi = null, DateTime? ngayThuPhi = null)
    {
        MaHoSo = maHoSo;
        SoTien = (int)soTien;
        Phi = (int)phi;
        LePhi = (int)lePhi;
        TrangThai = trangThai;
        NgayYeuCau = ngayYeuCau;
        NguoiYeuCau = nguoiYeuCau;
        DonViThu = donViThu;
        HinhThucThu = hinhThucThu;
        ChiTiet = chiTiet;
        Ma = maHoSo + "-" + DateTime.Now.ToString("yyyyMMddHHmmss");
        DonVi = donVi;
        NgayThuPhi = ngayThuPhi;
    }

    public YeuCauThanhToan(string maHoSo, int soTien, int phi, int lePhi, string hinhThucThu, string chiTiet, string? donVi = null)
    {
        MaHoSo = maHoSo;
        SoTien = soTien;
        Phi = phi;
        LePhi = lePhi;
        HinhThucThu = hinhThucThu;
        ChiTiet = chiTiet;
        Ma = maHoSo + "-" + DateTime.Now.ToString("yyyyMMddHHmmss");
        TrangThai = "Chờ thanh toán";
        DonVi = donVi;
    }
    public YeuCauThanhToan(string maHoSo, string ma, int soTien, int phi, int lePhi, string? trangThai, DateTime? ngayYeuCau, string? nguoiYeuCau, string? donViThu,
        string? hinhThucThanhToan, string hinhThucThu, string? chiTiet, string? ghiChuThanhToan, string? mauSoBienLai, string? kyHieuBienLai,
        string? nguoiThuPhi, DateTime? ngayThuPhi, string? donViThuPhiMaSoThue, string? donViMaSoThue, DateTime? ngayHoanPhi, string? nguoiHoanPhi, string? lyDoHoanPhi,
        DateTime? ngayHuy, string? nguoiHuy, string? lyDoHuy, string? donVi = null)
    {
        MaHoSo = maHoSo;
        Ma = ma;
        SoTien = soTien;
        Phi = phi;
        LePhi = lePhi;
        TrangThai = trangThai;
        NgayYeuCau = ngayYeuCau;
        NguoiYeuCau = nguoiYeuCau;
        DonViThu = donViThu;
        HinhThucThanhToan = hinhThucThanhToan;
        HinhThucThu = hinhThucThu;
        ChiTiet = chiTiet;
        GhiChuThanhToan = ghiChuThanhToan;
        MauSoBienLai = mauSoBienLai;
        KyHieuBienLai = kyHieuBienLai;
        NguoiThuPhi = nguoiThuPhi;
        NgayThuPhi = ngayThuPhi;
        DonViThuPhiMaSoThue = donViThuPhiMaSoThue;
        DonViMaSoThue = donViMaSoThue;
        NgayHoanPhi = ngayHoanPhi;
        NguoiHoanPhi = nguoiHoanPhi;
        LyDoHoanPhi = lyDoHoanPhi;
        NgayHuy = ngayHuy;
        NguoiHuy = nguoiHuy;
        LyDoHuy = lyDoHuy;
        DonVi = donVi;
    }
    public YeuCauThanhToan CapNhatThuSauChungThucHoSo(int tongTien, int phi, string trangThai)
    {
        SoTien = tongTien;
        Phi = phi;
        TrangThai = trangThai;
        //GhiChuThanhToan = "";
        return this;
    }
    public YeuCauThanhToan Update(string? maHoSo, string? ma, int? soTien, int? phi, int? lePhi, string? trangThai, DateTime? ngayYeuCau, string? nguoiYeuCau, string? donViThu,
        string? hinhThucThanhToan, string? hinhThucThu, string? chiTiet, string? ghiChuThanhToan, string? mauSoBienLai, string? kyHieuBienLai,
        string? nguoiThuPhi, DateTime? ngayThuPhi, string? donViThuPhiMaSoThue, string? donViMaSoThue, DateTime? ngayHoanPhi, string? nguoiHoanPhi, string? lyDoHoanPhi,
        DateTime? ngayHuy, string? nguoiHuy, string? lyDoHuy, string? donVi = null, string? tenNguoiNopTienBienLai = null, string? maSoThueBienLai = null, string? diaChiBienLai = null
        , string? tenPhiBienLai = null, string? tenLePhiBienLai = null, string? soTaiKhoanHoanPhi = null, string? tenTaiKhoanHoanPhi = null, string? tenNganHangHoanPhi = null,
        string? soGiayToNguoiNopTienBienLai = null, string? soBienLai = null, string? emailNguoiNopTienBienLai = null, string? soDienThoaiNguoiNopTienBienLai = null,
        string? maNganHangGiaoDich = null, string? maGiaoDich = null, string maThamChieuGiaoDich = null)
    {
        if (!string.IsNullOrEmpty(maHoSo) && !MaHoSo.Equals(maHoSo))
            MaHoSo = maHoSo;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (soTien != null)
            SoTien = (int)soTien;
        if (phi != null)
            Phi = (int)phi;
        if (lePhi != null)
            LePhi = (int)lePhi;
        if (!string.IsNullOrEmpty(trangThai) && !trangThai.Equals(TrangThai))
            TrangThai = trangThai;
        if (ngayYeuCau != null && ngayYeuCau != default)
        {
            NgayYeuCau = ngayYeuCau;

            NguoiYeuCau = nguoiYeuCau;

        }

        if (nguoiYeuCau != null)
            NguoiYeuCau = nguoiYeuCau != string.Empty ? nguoiYeuCau : null;
        if (donViThu != null)
            DonViThu = donViThu != string.Empty ? donViThu : null;
        if (hinhThucThanhToan != null)
            HinhThucThanhToan = hinhThucThanhToan != string.Empty ? hinhThucThanhToan : null;
        if (hinhThucThu != null)
            HinhThucThu = hinhThucThu != string.Empty ? hinhThucThu : null;
        if (chiTiet != null)
            ChiTiet = chiTiet != string.Empty ? chiTiet : null;
        if (ghiChuThanhToan != null)
            GhiChuThanhToan = ghiChuThanhToan != string.Empty ? ghiChuThanhToan : null;
        if (mauSoBienLai != null)
            MauSoBienLai = mauSoBienLai != string.Empty ? mauSoBienLai : null;
        if (kyHieuBienLai != null)
            KyHieuBienLai = kyHieuBienLai != string.Empty ? kyHieuBienLai : null;
        if (soBienLai != null)
            SoBienLai = soBienLai != string.Empty ? soBienLai : null;
        if (nguoiThuPhi != null)
            NguoiThuPhi = nguoiThuPhi != string.Empty ? nguoiThuPhi : null;
        if (ngayThuPhi != null && ngayThuPhi != default)
            NgayThuPhi = ngayThuPhi;
        if (donViThuPhiMaSoThue != null)
            DonViThuPhiMaSoThue = donViThuPhiMaSoThue != string.Empty ? donViThuPhiMaSoThue : null;
        if (donViMaSoThue != null)
            DonViMaSoThue = donViMaSoThue != string.Empty ? donViMaSoThue : null;
        if (ngayHoanPhi != null && ngayHoanPhi != default)
            NgayHoanPhi = ngayHoanPhi;
        if (nguoiHoanPhi != null)
            NguoiHoanPhi = nguoiHoanPhi != string.Empty ? nguoiHoanPhi : null;
        if (lyDoHoanPhi != null)
            LyDoHoanPhi = lyDoHoanPhi != string.Empty ? lyDoHoanPhi : null;
        if (ngayHuy != null && ngayHuy != default)
            NgayHuy = ngayHuy;
        if (nguoiHuy != null)
            NguoiHuy = nguoiHuy != string.Empty ? nguoiHuy : null;
        if (lyDoHuy != null)
            LyDoHuy = lyDoHuy != string.Empty ? lyDoHuy : null;
        if (!string.IsNullOrEmpty(donVi))
            DonVi = donVi;
        if (tenNguoiNopTienBienLai != null)
            NguoiNopTienBienLai = tenNguoiNopTienBienLai != string.Empty ? tenNguoiNopTienBienLai : null;
        if (maSoThueBienLai != null)
            MaSoThueBienLai = maSoThueBienLai != string.Empty ? maSoThueBienLai : null;
        if (diaChiBienLai != null)
            DiaChiBienLai = diaChiBienLai != string.Empty ? diaChiBienLai : null;
        if (tenPhiBienLai != null)
            TenPhiBienLai = tenPhiBienLai != string.Empty ? tenPhiBienLai : null;
        if (tenLePhiBienLai != null)
            TenLePhiBienLai = tenLePhiBienLai != string.Empty ? tenLePhiBienLai : null;
        if (soTaiKhoanHoanPhi != null)
            SoTaiKhoanHoanPhi = soTaiKhoanHoanPhi != string.Empty ? soTaiKhoanHoanPhi : null;
        if (tenTaiKhoanHoanPhi != null)
            TenTaiKhoanHoanPhi = tenTaiKhoanHoanPhi != string.Empty ? tenTaiKhoanHoanPhi : null;
        if (tenNganHangHoanPhi != null)
            TenNganHangHoanPhi = tenNganHangHoanPhi != string.Empty ? tenNganHangHoanPhi : null;
        if (soGiayToNguoiNopTienBienLai != null)
            SoGiayToNguoiNopTienBienLai = soGiayToNguoiNopTienBienLai != string.Empty ? soGiayToNguoiNopTienBienLai : null;
        if (emailNguoiNopTienBienLai != null) EmailNguoiNopTienBienLai = emailNguoiNopTienBienLai != string.Empty ? emailNguoiNopTienBienLai : null;
        if (soDienThoaiNguoiNopTienBienLai != null) SoDienThoaiNguoiNopTienBienLai = soDienThoaiNguoiNopTienBienLai != string.Empty ? soDienThoaiNguoiNopTienBienLai : null;
        if (maNganHangGiaoDich != null) MaNganHangGiaoDich = maNganHangGiaoDich != string.Empty ? maNganHangGiaoDich : null;
        if (maGiaoDich != null) MaGiaoDich = maGiaoDich != string.Empty ? maGiaoDich : null;
        if (maThamChieuGiaoDich != null) MaThamChieuGiaoDich = maThamChieuGiaoDich != string.Empty ? maThamChieuGiaoDich : null;
        return this;
    }
    public YeuCauThanhToan AdminUpdate(string? maHoSo, string? ma, int? soTien, int? phi, int? lePhi, string? trangThai, DateTime? ngayYeuCau, string? nguoiYeuCau, string? donViThu,
        string? hinhThucThanhToan, string? hinhThucThu, string? chiTiet, string? ghiChuThanhToan, string? mauSoBienLai, string? kyHieuBienLai,
        string? nguoiThuPhi, DateTime? ngayThuPhi, string? donViThuPhiMaSoThue, string? donViMaSoThue, DateTime? ngayHoanPhi, string? nguoiHoanPhi, string? lyDoHoanPhi,
        DateTime? ngayHuy, string? nguoiHuy, string? lyDoHuy, string? donVi = null, string? tenNguoiNopTienBienLai = null, string? maSoThueBienLai = null, string? diaChiBienLai = null, string? tenPhiBienLai = null, string? tenLePhiBienLai = null)
    {
        if (maHoSo != null)
            MaHoSo = maHoSo != string.Empty ? maHoSo : null;
        if (ma != null)
            Ma = ma != string.Empty ? ma : null;
        if (soTien != null)
            SoTien = (int)soTien;
        if (phi != null)
            Phi = (int)phi;
        if (lePhi != null)
            LePhi = (int)lePhi;
        if (trangThai != null)
            TrangThai = trangThai != string.Empty ? trangThai : null;
        if (ngayYeuCau != null && ngayYeuCau != default)
            NgayYeuCau = ngayYeuCau;
        if (nguoiYeuCau != null)
            NguoiYeuCau = nguoiYeuCau != string.Empty ? nguoiYeuCau : null;
        if (donViThu != null)
            DonViThu = donViThu != string.Empty ? donViThu : null;
        if (hinhThucThanhToan != null)
            HinhThucThanhToan = hinhThucThanhToan != string.Empty ? hinhThucThanhToan : null;
        if (hinhThucThu != null)
            HinhThucThu = hinhThucThu != string.Empty ? hinhThucThu : null;
        if (chiTiet != null)
            ChiTiet = chiTiet != string.Empty ? chiTiet : null;
        if (ghiChuThanhToan != null)
            GhiChuThanhToan = ghiChuThanhToan != string.Empty ? ghiChuThanhToan : null;
        if (mauSoBienLai != null)
            MauSoBienLai = mauSoBienLai != string.Empty ? mauSoBienLai : null;
        if (kyHieuBienLai != null)
            KyHieuBienLai = kyHieuBienLai != string.Empty ? kyHieuBienLai : null;
        if (nguoiThuPhi != null)
            NguoiThuPhi = nguoiThuPhi != string.Empty ? nguoiThuPhi : null;
        if (ngayThuPhi != null && ngayThuPhi != default)
            NgayThuPhi = ngayThuPhi;
        if (donViMaSoThue != null)
            DonViThuPhiMaSoThue = donViThuPhiMaSoThue != string.Empty ? donViThuPhiMaSoThue : null;
        if (donViMaSoThue != null)
            DonViMaSoThue = donViMaSoThue != string.Empty ? donViMaSoThue : null;
        if (ngayHoanPhi != null && ngayHoanPhi != default)
            NgayHoanPhi = ngayHoanPhi;
        if (nguoiHoanPhi != null)
            NguoiHoanPhi = nguoiHoanPhi != string.Empty ? nguoiHoanPhi : null;
        if (lyDoHoanPhi != null)
            LyDoHoanPhi = lyDoHoanPhi != string.Empty ? lyDoHoanPhi : null;
        if (ngayHuy != null && ngayHuy != default)
            NgayHuy = ngayHuy;
        if (nguoiHuy != null)
            NguoiHuy = nguoiHuy != string.Empty ? nguoiHuy : null;
        if (lyDoHuy != null)
            LyDoHuy = lyDoHuy != string.Empty ? LyDoHuy : null;
        if (donVi != null)
            DonVi = donVi != string.Empty ? donVi : null;
        if (tenNguoiNopTienBienLai != null)
            NguoiNopTienBienLai = tenNguoiNopTienBienLai != string.Empty ? tenNguoiNopTienBienLai : null;
        if (maSoThueBienLai != null)
            MaSoThueBienLai = maSoThueBienLai != string.Empty ? maSoThueBienLai : null;
        if (diaChiBienLai != null)
            DiaChiBienLai = diaChiBienLai != string.Empty ? diaChiBienLai : null;
        return this;
    }
    public YeuCauThanhToan SetDoiTacThanhToan(string doiTacThanhToan)
    {
        DoiTacThanhToan = doiTacThanhToan;
        return this;
    }
    public YeuCauThanhToan UpdateThuSau(int? soTien, int? phi, int? lePhi, string? trangThai, string? hinhThucThu, string? chiTiet, DateTime? ngayThuPhi = null)
    {
        if (soTien != null)
            SoTien = (int)soTien;
        if (phi != null)
            Phi = (int)phi;
        if (lePhi != null)
            LePhi = (int)lePhi;
        if (trangThai != null)
            TrangThai = trangThai != string.Empty ? trangThai : null;
        if (hinhThucThu != null)
            HinhThucThu = hinhThucThu != string.Empty ? hinhThucThu : null;
        if (chiTiet != null) ChiTiet = chiTiet;
        if (ngayThuPhi.HasValue) NgayThuPhi = ngayThuPhi.Value;
        return this;
    }
    public YeuCauThanhToan UpdateThongTinBienLai(string? mauSoBienLai, string? kyHieuBienLai, string? duongDanBienLai, string? soBienLaiPhi = null, string? soBienLaiLePhi = null, string? donViThuMaSoThue = null, DateTime? ngayLapHoaDonPhi = null, DateTime? ngayLapHoaDonLePhi = null)
    {
        if (mauSoBienLai != null) MauSoBienLai = mauSoBienLai != string.Empty ? mauSoBienLai : null;
        if (kyHieuBienLai != null) KyHieuBienLai = kyHieuBienLai != string.Empty ? kyHieuBienLai : null;
        if (duongDanBienLai != null) DuongDanBienLai = duongDanBienLai != string.Empty ? duongDanBienLai : null;
        if (soBienLaiPhi != null) SoBienLaiPhi = soBienLaiPhi != string.Empty ? soBienLaiPhi : null;
        if (soBienLaiLePhi != null) SoBienLaiLePhi = soBienLaiLePhi != string.Empty ? soBienLaiLePhi : null;
        if (donViThuMaSoThue != null) DonViThuPhiMaSoThue = donViThuMaSoThue;
        if (ngayLapHoaDonPhi.HasValue) NgayLapHoaDonPhi = ngayLapHoaDonPhi.Value;
        if (ngayLapHoaDonLePhi.HasValue) NgayLapHoaDonLePhi = ngayLapHoaDonLePhi.Value;
        return this;
    }

    public YeuCauThanhToan SetLLTPVneid(string duongDanBienLai, string tenLePhiBienLai, string nguoiNopTienBienLai, string diaChiBienLai)
    {
        if (!string.IsNullOrEmpty(duongDanBienLai))
            DuongDanBienLai = duongDanBienLai;
        if (!string.IsNullOrEmpty(tenLePhiBienLai))
            TenLePhiBienLai = tenLePhiBienLai;
        if (!string.IsNullOrEmpty(nguoiNopTienBienLai))
            NguoiNopTienBienLai = nguoiNopTienBienLai;
        if (!string.IsNullOrEmpty(diaChiBienLai))
            DiaChiBienLai = diaChiBienLai;
        return this;
    }

    public YeuCauThanhToan UpdateBienLaiDienTu(int? phi, int? lePhi, string? tenBienLaiPhi, string? tenBienLaiLePhi,
        string? nguoiNopTienBienLai, string? diaChiNguoiNopTienBienLai, string? maSoThueBienLai, string? emailNguoiNopTienBienLai = null, string? hinhThucThanhToan = null)
    {
        int soTien = 0;
        if (phi.HasValue && lePhi.HasValue)
        {
            soTien = phi.Value + lePhi.Value;
            Phi = phi.Value;
            LePhi = lePhi.Value;
        }
        else
        if (phi.HasValue)
        {
            Phi = phi.Value;
            soTien = LePhi + phi.Value;
        }
        else
        if (lePhi.HasValue)
        {
            LePhi = lePhi.Value;
            soTien = Phi + lePhi.Value;
        }
        if (phi.HasValue || lePhi.HasValue) SoTien = soTien;
        if (tenBienLaiLePhi != null) TenLePhiBienLai = tenBienLaiLePhi != string.Empty ? tenBienLaiLePhi : null;
        if (tenBienLaiPhi != null) TenPhiBienLai = tenBienLaiPhi != string.Empty ? tenBienLaiPhi : null;
        if (nguoiNopTienBienLai != null) NguoiNopTienBienLai = nguoiNopTienBienLai != string.Empty ? nguoiNopTienBienLai : null;
        if (diaChiNguoiNopTienBienLai != null) DiaChiBienLai = diaChiNguoiNopTienBienLai != string.Empty ? diaChiNguoiNopTienBienLai : null;
        if (maSoThueBienLai != null) MaSoThueBienLai = maSoThueBienLai != string.Empty ? maSoThueBienLai : null;
        if (emailNguoiNopTienBienLai != null) EmailNguoiNopTienBienLai = emailNguoiNopTienBienLai != string.Empty ? emailNguoiNopTienBienLai : null;

        if (hinhThucThanhToan != null) HinhThucThanhToan = hinhThucThanhToan != string.Empty ? hinhThucThanhToan : null;
        return this;
    }
    public YeuCauThanhToan UpdateYeuCauThanhToanLai(string? nguoiYeuCau, string? donViYeuCau, int? phi, int? lePhi, string? trangThai)
    {
        int? soTien = null;
        if (trangThai != null) TrangThai = trangThai != string.Empty ? trangThai : null;
        if (nguoiYeuCau != null) NguoiYeuCau = nguoiYeuCau != string.Empty ? nguoiYeuCau : null;
        if (donViYeuCau != null) DonVi = donViYeuCau != string.Empty ? donViYeuCau : null;
        if (phi.HasValue) Phi = phi.Value;
        if (lePhi.HasValue) LePhi = lePhi.Value;
        if (phi.HasValue && lePhi.HasValue) soTien = phi.Value + lePhi.Value;
        else if (phi.HasValue) soTien = phi;
        else if (lePhi.HasValue) soTien = lePhi;
        if (soTien.HasValue) SoTien = soTien.Value;
        return this;
    }
    public YeuCauThanhToan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }
    public YeuCauThanhToan Restore()
    {
        DeletedOn = null;
        return this;
    }
}

public class YeuCauThanhToanConstant
{
    public const string HinhThucThu_ThuTruoc = "Thu trước";
    public const string HinhThucThu_ThuSau = "Thu sau";
    public const string HinhThucThu_DoiTuongMienPhi = "Đối tượng miễn phí";
    public const string DoiTacThanhToan_VNeID = "VNeID";
    public const string TrangThai_HuyThanhToan = "Hủy thanh toán";

    public const string DoiTacThanhToan_PaymentPlatform = "paymentplatform";
}