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
public class GiaoDichThanhToan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string HoSo { get; private set; }
    [MaxLength(50)]
    public string YeuCauThanhToan { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaThamChieu { get; private set; }
    public int SoTien { get; private set; }
    [MaxLength(100)]
    public string? LoaiHinhThanhToan { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaKenhThanhToan { get; private set; }
    [MaxLength(1000)]
    public string? ThongTinGiaoDich { get; private set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? Ip { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TKThuHuong { get; private set; }
    [MaxLength(100)]
    public string? TenTKThuHuong { get; private set; }
    [MaxLength(100)]
    public string? LoaiPhiLePhi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaPhiLePhi { get; private set; }
    [MaxLength(2000)]
    public string? TenPhiLePhi { get; private set; }
    [MaxLength(50)]
    public string? MaDonVi { get; private set; }
    [MaxLength(1000)]
    public string TenDonVi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaThuTucDVCQG { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDVCThuTucDVCQuocGia { get; private set; }
    [MaxLength(2000)]
    public string? TenThuTucDVCQG { get; private set; }
    [MaxLength(2000)]
    public string? TenDVCThuTucDVCQuocGia { get; private set; }
    [MaxLength(100)]
    public string? HoTenNguoiNop { get; private set; }
    [MaxLength(25)]
    [Column(TypeName = "varchar")]
    public string SoCMNDNguoiNop { get; private set; }
    [MaxLength(3000)]
    public string? DiaChiNguoiNop { get; private set; }
    [MaxLength(25)]
    public string? TrangThai { get; private set; }
    public DateTime ThoiGianGD { get; private set; }
    public DateTime? NgayTao { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaGiaoDich { get; private set; }
    [MaxLength(5000)]
    [Column(TypeName = "varchar")]
    public string? MaDoiTac { get; private set; }
    [MaxLength(250)]
    public string? LoaiBanTin { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? MaLoi { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? MaNganHang { get; private set; }
    public DateTime? ThoiGianGDThanhCong { get; private set; }
    public DateTime? NgayCapNhatKetQua { get; private set; }
    [MaxLength(5000)]
    [Column(TypeName = "varchar")]
    public string? DuongDanBienLai { get; private set; }

    public string? BodyKetQua { get; private set; }

    public string? ResponseDvcPayment { get; private set; }
    [MaxLength(1000)]
    public string? NguoiNopTienBienLai { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaSoThueBienLai { get; private set; }
    public string? DiaChiBienLai { get; private set; }
    [MaxLength(200)]
    public string? SoTaiKhoanHoanPhi { get; private set; }
    [MaxLength(500)]
    public string? TenTaiKhoanHoanPhi { get; private set; }
    [MaxLength(500)]
    public string? TenNganHangHoanPhi { get; private set; }
    [MaxLength(20)]
    public string? SoGiayToNguoiNopTienBienLai { get; private set; }
    public string? EmailNguoiNopTienBienLai { get; private set; }
    public bool? AutoCheckedTrangThaiTTTT { get; private set; } = false;
    public GiaoDichThanhToan() { }
    public GiaoDichThanhToan(string hoSo,string yeuCauThanhToan,string maThamChieu,int soTien,string loaiHinhThanhToan,string maKenhThanhToan,string thongTinGiaoDich,string ip,string tkThuHuong,
        string tenTkThuHuong,string loaiPhiLePhi,string maPhiLePhi,string tenPhiLePhi,string maDonVi,string tenDonVi,string maThuTucDVCQG,string maDVCThuTucDVCQuocGia,string tenThuTucDVCQG,
        string tenDVCThuTucDVCQuocGia,string hoTenNguoiNop,string soCMNDNguoiNop,string diaChiNguoiNop,string trangThai,DateTime thoiGianGD,DateTime ngayTao,string maGiaoDich,string maDoiTac,
        string loaiBanTin,string maLoi,string maNganHang,DateTime thoiGianGDThanhCong,DateTime ngayCapNhatKetQua,string duongDanBienLai,string bodyKetQua,string? responseDvcPayment = null,
        string? tenNguoiNopTienBienLai = null, string? maSoThueBienLai = null, string? diaChiBienLai = null, string? soTaiKhoanHoanPhi = null, string? tenTaiKhoanHoanPhi = null, string? tenNganHangHoanPhi = null,
        string? soGiayToNguoiNopTienBienLai= null,string? emailNguoiNopTienBienLai = null)
    {
        HoSo = hoSo ?? "";
        YeuCauThanhToan = yeuCauThanhToan ?? "";
        MaDoiTac = maDoiTac ?? "";
        MaThamChieu = maThamChieu ?? "";
        MaDonVi = maDonVi ?? "";
        SoTien = soTien;
        LoaiHinhThanhToan = loaiHinhThanhToan ?? "";
        MaKenhThanhToan = maKenhThanhToan ?? "";
        ThongTinGiaoDich = thongTinGiaoDich ?? "";
        Ip = ip ?? "";
        TKThuHuong = tkThuHuong ?? "";
        TenTKThuHuong = tenTkThuHuong ?? "";
        LoaiPhiLePhi = loaiPhiLePhi ?? "";
        MaPhiLePhi = maPhiLePhi ?? "";
        TenPhiLePhi = tenPhiLePhi ?? "";
        TenDonVi = tenDonVi ?? "";
        MaDVCThuTucDVCQuocGia = maDVCThuTucDVCQuocGia ?? "";
        MaThuTucDVCQG = maThuTucDVCQG ?? "";
        TenThuTucDVCQG = tenThuTucDVCQG ?? "";
        TenDVCThuTucDVCQuocGia = tenDVCThuTucDVCQuocGia ?? "";
        HoTenNguoiNop = hoTenNguoiNop ?? "";
        SoCMNDNguoiNop = soCMNDNguoiNop ?? "";
        DiaChiNguoiNop = diaChiNguoiNop ?? "";
        TrangThai = trangThai ?? "";
        ThoiGianGD = thoiGianGD;
        NgayTao = ngayTao;
        MaGiaoDich = maGiaoDich ?? "";
        LoaiBanTin = loaiBanTin ?? "";
        MaLoi = maLoi ?? "";
        MaNganHang = maNganHang ?? "";
        ThoiGianGDThanhCong = thoiGianGDThanhCong;
        NgayCapNhatKetQua = ngayCapNhatKetQua;
        DuongDanBienLai = duongDanBienLai ?? "";
        BodyKetQua = bodyKetQua ?? "";
        ResponseDvcPayment = responseDvcPayment;
        NguoiNopTienBienLai = tenNguoiNopTienBienLai;
        DiaChiBienLai = diaChiBienLai;
        MaSoThueBienLai = maSoThueBienLai;
        TenTaiKhoanHoanPhi = tenTaiKhoanHoanPhi;
        TenNganHangHoanPhi = tenNganHangHoanPhi;
        SoTaiKhoanHoanPhi = soTaiKhoanHoanPhi;
        SoGiayToNguoiNopTienBienLai = soGiayToNguoiNopTienBienLai;
        EmailNguoiNopTienBienLai = emailNguoiNopTienBienLai;
    }
    public static GiaoDichThanhToan Create(string hoSo, string yeuCauThanhToan, string maThamChieu, int soTien, string loaiHinhThanhToan, string maKenhThanhToan, string thongTinGiaoDich, string ip, string tkThuHuong,
        string tenTkThuHuong, string loaiPhiLePhi, string maPhiLePhi, string tenPhiLePhi, string maDonVi, string tenDonVi, string maThuTucDVCQG, string maDVCThuTucDVCQuocGia, string tenThuTucDVCQG,
        string tenDVCThuTucDVCQuocGia, string hoTenNguoiNop, string soCMNDNguoiNop, string diaChiNguoiNop, string trangThai, DateTime thoiGianGD, DateTime ngayTao, string maGiaoDich, string maDoiTac,
        string loaiBanTin, string maLoi, string maNganHang, DateTime thoiGianGDThanhCong, DateTime ngayCapNhatKetQua, string duongDanBienLai, string bodyKetQua,string? responseDvcPayment = "", string? tenNguoiNopTienBienLai = null, string? maSoThueBienLai = null, string? diaChiBienLai = null
        , string? soTaiKhoanHoanPhi = null, string? tenTaiKhoanHoanPhi = null, string? tenNganHangHoanPhi = null, string? soGiayToNguoiNopTienBienLai = null, string? emailNguoiNopTienBienLai = null)
    {
        return new(hoSo, yeuCauThanhToan, maThamChieu, soTien, loaiHinhThanhToan, maKenhThanhToan, thongTinGiaoDich, ip, tkThuHuong, tenTkThuHuong, loaiPhiLePhi,
            maPhiLePhi, tenPhiLePhi, maDonVi, tenDonVi, maThuTucDVCQG, maDVCThuTucDVCQuocGia, tenThuTucDVCQG, tenDVCThuTucDVCQuocGia, hoTenNguoiNop, soCMNDNguoiNop,
            diaChiNguoiNop, trangThai, thoiGianGD, ngayTao, maGiaoDich, maDoiTac, loaiBanTin, maLoi, maNganHang, thoiGianGDThanhCong, ngayCapNhatKetQua, duongDanBienLai, bodyKetQua, responseDvcPayment,
            tenNguoiNopTienBienLai,maSoThueBienLai,diaChiBienLai,soTaiKhoanHoanPhi,tenTaiKhoanHoanPhi,tenNganHangHoanPhi,soGiayToNguoiNopTienBienLai,emailNguoiNopTienBienLai);
    }
    public GiaoDichThanhToan Update(string? hoSo, string? yeuCauThanhToan, string? maThamChieu, int? soTien, string? loaiHinhThanhToan, string? maKenhThanhToan, string? thongTinGiaoDich, string? ip, string? tkThuHuong,
        string? tenTkThuHuong, string? loaiPhiLePhi, string? maPhiLePhi, string? tenPhiLePhi, string? maDonVi, string? tenDonVi, string? maThuTucDVCQG, string? maDVCThuTucDVCQuocGia, string? tenThuTucDVCQG,
        string? tenDVCThuTucDVCQuocGia, string? hoTenNguoiNop, string? soCMNDNguoiNop, string? diaChiNguoiNop, string? trangThai, DateTime? thoiGianGD, DateTime? ngayTao, string? maGiaoDich, string? maDoiTac,
        string? loaiBanTin, string? maLoi, string? maNganHang, DateTime? thoiGianGDThanhCong, DateTime? ngayCapNhatKetQua, string? duongDanBienLai, string? bodyKetQua, string? responseDvcPayment = null,
        string? tenNguoiNopTienBienLai = null, string? maSoThueBienLai = null, string? diaChiBienLai = null, string? soTaiKhoanHoanPhi = null, string? tenTaiKhoanHoanPhi = null, string? tenNganHangHoanPhi = null,
        string? emailNguoiNopTienBienLai = null, bool? autoCheck= null)
    {
        if (!string.IsNullOrEmpty(hoSo) && !HoSo.Equals(hoSo))
            HoSo = hoSo;
        if (!string.IsNullOrEmpty(yeuCauThanhToan) && !YeuCauThanhToan.Equals(yeuCauThanhToan))
            YeuCauThanhToan = yeuCauThanhToan;
        if (!string.IsNullOrEmpty(maThamChieu) && !MaThamChieu.Equals(maThamChieu))
            MaThamChieu = maThamChieu;
        if (!string.IsNullOrEmpty(loaiHinhThanhToan) && !LoaiHinhThanhToan.Equals(loaiHinhThanhToan))
            LoaiHinhThanhToan = loaiHinhThanhToan;
        if (!string.IsNullOrEmpty(maKenhThanhToan) && !MaKenhThanhToan.Equals(maKenhThanhToan))
            MaKenhThanhToan = maKenhThanhToan;
        if (!string.IsNullOrEmpty(thongTinGiaoDich) && !ThongTinGiaoDich.Equals(thongTinGiaoDich))
            ThongTinGiaoDich = thongTinGiaoDich;
        if (!string.IsNullOrEmpty(ip) && !Ip.Equals(ip))
            Ip = ip;
        if (!string.IsNullOrEmpty(tkThuHuong) && !TKThuHuong.Equals(tkThuHuong))
            TKThuHuong = tkThuHuong;
        if (!string.IsNullOrEmpty(tenTkThuHuong) && !TenTKThuHuong.Equals(tenTkThuHuong))
            TenTKThuHuong = tenTkThuHuong;
        if (!string.IsNullOrEmpty(loaiPhiLePhi) && !LoaiPhiLePhi.Equals(loaiPhiLePhi))
            LoaiPhiLePhi = loaiPhiLePhi;
        if (!string.IsNullOrEmpty(maPhiLePhi) && !MaPhiLePhi.Equals(maPhiLePhi))
            MaPhiLePhi = maPhiLePhi;
        if (!string.IsNullOrEmpty(tenPhiLePhi) && !TenPhiLePhi.Equals(tenPhiLePhi))
            TenPhiLePhi = tenPhiLePhi;
        if (!string.IsNullOrEmpty(maDonVi) && !MaDonVi.Equals(maDonVi))
            MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(tenDonVi) && !TenDonVi.Equals(tenDonVi))
            TenDonVi = tenDonVi;
        if (!string.IsNullOrEmpty(maThuTucDVCQG) && !MaThuTucDVCQG.Equals(maThuTucDVCQG))
            MaThuTucDVCQG = maThuTucDVCQG;
        if (!string.IsNullOrEmpty(maDVCThuTucDVCQuocGia) && !MaDVCThuTucDVCQuocGia.Equals(maDVCThuTucDVCQuocGia))
            MaDVCThuTucDVCQuocGia = maDVCThuTucDVCQuocGia;
        if (!string.IsNullOrEmpty(tenThuTucDVCQG) && !TenThuTucDVCQG.Equals(tenThuTucDVCQG))
            TenThuTucDVCQG = tenThuTucDVCQG;
        if (!string.IsNullOrEmpty(tenDVCThuTucDVCQuocGia) && !TenDVCThuTucDVCQuocGia.Equals(tenDVCThuTucDVCQuocGia))
            TenDVCThuTucDVCQuocGia = tenDVCThuTucDVCQuocGia;
        if (!string.IsNullOrEmpty(hoTenNguoiNop) && !HoTenNguoiNop.Equals(hoTenNguoiNop))
            HoTenNguoiNop = hoTenNguoiNop;
        if (!string.IsNullOrEmpty(soCMNDNguoiNop) && !SoCMNDNguoiNop.Equals(soCMNDNguoiNop))
            SoCMNDNguoiNop = soCMNDNguoiNop;
        if (!string.IsNullOrEmpty(diaChiNguoiNop) && !DiaChiNguoiNop.Equals(diaChiNguoiNop))
            DiaChiNguoiNop = diaChiNguoiNop;
        if (!string.IsNullOrEmpty(trangThai) && !TrangThai.Equals(trangThai))
            TrangThai = trangThai;
        if (!string.IsNullOrEmpty(maGiaoDich) && !MaGiaoDich.Equals(maGiaoDich))
            MaGiaoDich = maGiaoDich;
        if (!string.IsNullOrEmpty(maDoiTac) && !MaDoiTac.Equals(maDoiTac))
            MaDoiTac = maDoiTac;
        if (!string.IsNullOrEmpty(loaiBanTin) && !LoaiBanTin.Equals(loaiBanTin))
            LoaiBanTin = loaiBanTin;
        if (!string.IsNullOrEmpty(maLoi) && !MaLoi.Equals(maLoi))
            MaLoi = maLoi;
        if (!string.IsNullOrEmpty(maNganHang) && !MaNganHang.Equals(maNganHang))
            MaNganHang = maNganHang;
        if (!string.IsNullOrEmpty(duongDanBienLai) && !DuongDanBienLai.Equals(duongDanBienLai))
            DuongDanBienLai = duongDanBienLai;
        if (!string.IsNullOrEmpty(bodyKetQua) && !BodyKetQua.Equals(bodyKetQua))
            BodyKetQua = bodyKetQua;
        if (thoiGianGD != null && thoiGianGD != default)
            ThoiGianGD = (DateTime)thoiGianGD;
        if (ngayTao != null && ngayTao != default)
            NgayTao = (DateTime)ngayTao;
        if (thoiGianGDThanhCong != null && thoiGianGDThanhCong != default)
            ThoiGianGDThanhCong = (DateTime)thoiGianGDThanhCong;
        if (ngayCapNhatKetQua != null && ngayCapNhatKetQua != default)
            NgayCapNhatKetQua = (DateTime)ngayCapNhatKetQua;
        if (soTien != null)
            SoTien = (int)soTien;
        if(responseDvcPayment != null)
        {
            ResponseDvcPayment = responseDvcPayment;
        }
        if (tenNguoiNopTienBienLai != null)
            NguoiNopTienBienLai = tenNguoiNopTienBienLai != string.Empty ? tenNguoiNopTienBienLai : null;
        if (maSoThueBienLai != null)
            MaSoThueBienLai = maSoThueBienLai != string.Empty ? maSoThueBienLai : null;
        if (diaChiBienLai != null)
            DiaChiBienLai = diaChiBienLai != string.Empty ? diaChiBienLai : null;
        if (soTaiKhoanHoanPhi != null)
            SoTaiKhoanHoanPhi = soTaiKhoanHoanPhi != string.Empty ? soTaiKhoanHoanPhi : null;
        if (tenTaiKhoanHoanPhi != null)
            TenTaiKhoanHoanPhi = tenTaiKhoanHoanPhi != string.Empty ? tenTaiKhoanHoanPhi : null;
        if (tenNganHangHoanPhi != null)
            TenNganHangHoanPhi = tenNganHangHoanPhi != string.Empty ? tenNganHangHoanPhi : null;
        if (emailNguoiNopTienBienLai != null) EmailNguoiNopTienBienLai = emailNguoiNopTienBienLai != string.Empty ? emailNguoiNopTienBienLai : null;
        if (autoCheck != null) AutoCheckedTrangThaiTTTT = autoCheck;
        return this;
    }
    public GiaoDichThanhToan UpdateGiaoDich(string? duongDanBienLai, string? bodyKetQua = null, string? responseDvcPayment = null)
    {
        if (duongDanBienLai != null) DuongDanBienLai = duongDanBienLai;
        return this;
    }
    public GiaoDichThanhToan CheckTTTT(string? trangThai, string? response)
    {
        if(!string.IsNullOrEmpty(trangThai)) TrangThai= trangThai;
        if (!string.IsNullOrEmpty(response)) ResponseDvcPayment = response;
        return this;
    }
    public GiaoDichThanhToan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public GiaoDichThanhToan Restore()
    {
        DeletedOn = null;
        return this;
    }

}
