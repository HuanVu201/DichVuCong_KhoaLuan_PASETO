using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class HoSoLienThongDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string ChuHoSo { get; set; }
    public string SoDienThoaiChuHoSo { get; set; }
    public string EmailChuHoSo { get; set; }
    public string TrichYeuHoSo { get; set; }
    public string TrangThaiBoSung { get; set; }
    public string SoKyHieuKetQua { get; set; }
    public string TenDiaBan { get; set; }
    public string TenBuocHienTai { get; set; }
    public string LoaiKetQuaHSLT { get; set; }
    public string SoKyHieuHSLT { get; set; }
    public string TrichyeuHSLT { get; set; }
    public string DinhKemHSLT { get; set; }
    public bool UyQuyen { get; set; }
    public string SoGiayToChuHoSo { get; set; }
    public string NgayTiepNhan { get; set; }
    public string ThuTucKhongCoKetQua { get; set; }
    public string MaGiayToHoSo { get; set; }
    public string LyDoTuChoi { get; set; }
    public string LyDoBoSung { get; set; }
    public string NgayNopHoSo { get; set; }
    public string NgayHenTra { get; set; }
    public string CreatedOn { get; set; }
    public string TenTruongHop { get; set; }
    public string MaHoSo { get; set; }
    public string KenhThucHien { get; set; }
    public string TenDonVi { get; set; }
    public string DonViId { get; set; }
    public string DiaChi { get; set; }
    public string TenTrangThaiHoSo { get; set; }
    public string TenTTHC { get; set; }
    public string MaTTHC { get; set; }
    public string TrangThaiThuPhi { get; set; }
    public bool TrangThaiPhiLePhi { get; set; }
    public string MaTruongHop { get; set; }
    public string TrangThaiHoSoId { get; set; }
    public string DiaChiChuHoSo { get; set; }
    public string? NgayHenTraCaNhan { get; set; }
    public string? NgayDangKyBuuDien { get; set; }
    public string? NgayTraBuuDien { get; set; }
    public string? TrangThaiTraBuuDien { get; set; }
    public bool? DaHetHanBoSung { get; set; }
    public string? MaVanDonBuuDien { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public string TenNguoiXuLyTruoc { get; set; }
    public string NguoiXuLyTiep { get; set; }
    public string? NguoiUyQuyen { get; set; }
    //public List<YeuCauThanhToanDto>? yeuCauThanhToanDtos { get; set; }
    public string? LoaiNguoiNhanKetQua { get; set; }
    public string? HoTenNguoiNhanKetQua { get; set; }
    public string? BanGocThuLai { get; set; }
    public string? SoLuongBanGocThuLai { get; set; }
    public string? DinhKemNhanKetQua { get; set; }
    public string? NguoiNhanKetQua { get; set; }
    public string? ChuKyNguoiNhanKetQua { get; set; }
    public DateTime? NgayTra { get; set; }
    public string? NgayXacNhanKetQua { get; set; }
    public string? LoaiKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public bool? BatBuocDinhKemKetQua { get; set; }
    public bool? BatBuocKySoKetQua { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
