using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Dtos;
public class HoSoNhapDetailDto : IDto
{
    public HoSoNhapDetailDto()
    {
        ThanhPhanHoSos = new List<ThanhPhanHoSoNhapDto>();
    }
    public Guid Id { get; set; }
    public string? CoQuanBanHanhKetQua { get; set; }
    public string? TenDiaBan { get; set; }
    public string? LoaiVanBanKetQua { get; set; }
    public string? TinhThanhChuHoSo { get; set; }
    public string? QuanHuyenChuHoSo { get; set; }
    public string? XaPhuongChuHoSo { get; set; }
    public string? NgayBanHanhKetQua { get; set; }
    public string? EmailNguoiUyQuyen { get; set; }
    public string? TinhThanhNguoiUyQuyen { get; set; }
    public string? QuanHuyenNguoiUyQuyen { get; set; }
    public string? XaPhuongNguoiUyQuyen { get; set; }
    public string? DiaChiNguoiUyQuyen { get; set; }
    public string? NguoiKyKetQua { get; set; }
    public string? TinhThanhDiaBan { get; set; }
    public string? QuanHuyenDiaBan { get; set; }
    public string? XaPhuongDiaBan { get; set; }

    public string? SoKyHieuKetQua { get; set; }
    public string? NgayKyKetQua { get; set; }
    public string? DinhKemTuChoi { get; set; }
    public string? KenhThucHien { get; set; }
    public string? MaHoSo { get; set; }
    public string? DonViId { get; set; }
    public string? BuocHienTai { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? LyDoTuChoi { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public bool? LaHoSoChungThuc { get; set; }
    public string? MaTTHC { get; set; }
    public string? NguoiDaXuLy { get; set; }
    public string? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public string? NgayTra { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? YKienNguoiChuyenXuLy { get; set; }
    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? NgaySinhChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? HinhThucTra { get; set; }
    public bool? UyQuyen { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? SoGiayToNguoiUyQuyen { get; set; }
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public bool? ThongBaoEmail { get; set; }
    public bool? ThongBaoZalo { get; set; }
    public bool? ThongBaoSMS { get; set; }
    public string? MaTruongHop { get; set; }
    public string? EdgeQuyTrinh { get; set; }
    public string? NodeQuyTrinh { get; set; }
    public string? ThongTinTiepNhanBoSung { get; set; }
    public string? EFormData { get; set; } //submission
    public string? EForm { get; set; } // form
    public double? ThoiGianThucHien { get; set; } // form
    public string? LoaiThoiGianThucHien { get; set; } // form
    public string? FullName { get; set; }
    public string? NguoiTiepNhan { get; set; }
    public string? TenTTHC { get; set; }
    public List<ThanhPhanHoSoNhapDto> ThanhPhanHoSos { get; set; }
    public TruongHopThuTuc TruongHopThuTuc { get; set; }
    public string? DanhGia { get; set; }
    public string? MaVanDonBuuDien { get; set; }
}
