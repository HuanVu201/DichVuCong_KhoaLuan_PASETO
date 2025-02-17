using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Infrastructure.DvcPayment;
public class InitDvcPaymentRequest
{
    public string LoaiBanTin { get; set; }
    public string PhienBan { get; set; }
    public string MaDoiTac { get; set; }
    public string MaThamChieu { get; set; }
    public string SoTien { get; set; }
    public string LoaiHinhThanhToan { get; set; }
    public string MaKenhThanhToan { get; set; }
    public string MaThietBi { get; set; }
    public string NgonNgu { get; set; }
    public string MaTienTe { get; set; }
    public string MaNganHang { get; set; }
    public string ThongTinGiaoDich { get; set; }
    public string ThoiGianGD { get; set; }
    public string Ip { get; set; }
    public string MaXacThuc { get; set; }
    public ThongTinBienLaiDvcPayment ThongTinBienLai { get; set; }
    public InitDvcPaymentRequest()
    {
        LoaiBanTin = "INIT";
        PhienBan = "1.0.6";
        LoaiHinhThanhToan = "PAY";
        MaKenhThanhToan = "1";
        MaThietBi = "1";
        NgonNgu = "vi-VN";
        MaNganHang = "PAYMENT";
        MaTienTe = "VND";

        ThongTinBienLai = new ThongTinBienLaiDvcPayment();
    }
}
public class ThongTinBienLaiDvcPayment
{
    public string MaDichVu { get; set; } = string.Empty;
    public string MaDVC { get; set; } = string.Empty;
    public string TenDVC { get; set; } = string.Empty;
    public string MaTTHC { get; set; } = string.Empty;
    public string TenTTHC { get; set; } = string.Empty;
    public string MaDonVi { get; set; } = string.Empty;
    public string TenDonVi { get; set; } = string.Empty;
    public string MaHoSo { get; set; } = string.Empty;
    public string TKThuHuong { get; set; } = string.Empty;
    public string MaNHThuHuong { get; set; } = string.Empty;
    public string TenTKThuHuong { get; set; } = string.Empty;
    public string MaLoaiHinhThuPhat { get; set; } = string.Empty;
    public string TenLoaiHinhThuPhat { get; set; } = string.Empty;
    public string MaCoQuanQD { get; set; } = string.Empty;
    public string TenCoQuanQD { get; set; } = string.Empty;
    public string KhoBac { get; set; } = string.Empty;
    public string NgayQD { get; set; } = string.Empty;
    public string SoQD { get; set; } = string.Empty;
    public string ThoiGianViPham { get; set; } = string.Empty;
    public string DiaDiemViPham { get; set; } = string.Empty;
    public string TenNguoiViPham { get; set; } = string.Empty;
    public string TaiKhoanThuNSNN { get; set; } = string.Empty;
    public string NoiDungThanhToan { get; set; } = string.Empty;
    public string HoTenNguoiNop { get; set; } = string.Empty;
    public string SoCMNDNguoiNop { get; set; } = string.Empty;
    public string DiaChiNguoiNop { get; set; } = string.Empty;
    public string HuyenNguoiNop { get; set; } = string.Empty;
    public string TinhNguoiNop { get; set; } = string.Empty;
    public List<PhiLePhiDetail> PhiLePhi { get; set; }
    public List<DSKhoanNopDetail> DSKhoanNop { get; set; }
    public ThongTinBienLaiDvcPayment() {
        MaDichVu = "2";
        PhiLePhi = new List<PhiLePhiDetail>();
        DSKhoanNop = new List<DSKhoanNopDetail>();
    }
}
public class PhiLePhiDetail
{
    public string LoaiPhiLePhi { get; set; }
    public string MaPhiLePhi { get; set; }
    public string TenPhiLePhi { get; set; }
    public string SoTien { get; set; }
    public PhiLePhiDetail(string loaiPhiLePhi, string maLePhi, string tenPhiLePhi, string soTien)
    {
        LoaiPhiLePhi = loaiPhiLePhi;
        MaPhiLePhi = maLePhi;
        TenPhiLePhi = tenPhiLePhi;
        SoTien = soTien;
    }
}
public class DSKhoanNopDetail
{
    public string NoiDung { get; set; }
    public string SoTien { get; set; }
    public DSKhoanNopDetail(string noiDung, string soTien) {
        NoiDung = noiDung;
        SoTien = soTien;
    }
}