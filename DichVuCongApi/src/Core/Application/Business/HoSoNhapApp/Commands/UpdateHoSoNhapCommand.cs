using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;


namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class UpdateHoSoNhapCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? ChoXacNhan { get; set; }

    public string? DonViId { get; set; }
    public string? TenDiaBan { get; set; }
    public string? KenhThucHien { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? MaDoiTuong { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? LoaiGiayToChuHoSo { get; set; }
    public string? NgaySinhChuHoSo { get; set; }
    public string? TinhThanhChuHoSo { get; set; }
    public string? QuanHuyenChuHoSo { get; set; }
    public string? XaPhuongChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public bool? UyQuyen { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    public string? EmailNguoiUyQuyen { get; set; }
    public string? SoGiayToNguoiUyQuyen { get; set; }
    public string? LoaiGiayToNguoiUyQuyen { get; set; }
    public string? NgaySinhNguoiUyQuyen { get; set; }
    public string? TinhThanhNguoiUyQuyen { get; set; }
    public string? QuanHuyenNguoiUyQuyen { get; set; }
    public string? XaPhuongNguoiUyQuyen { get; set; }
    public string? DiaChiNguoiUyQuyen { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? HinhThucTra { get; set; }
    public string? GhiChu { get; set; }
    public string? NoiNopHoSo { get; set; }
    public string? HoSoCoThanhPhanSoHo { get; set; }
    public string? TaiKhoanDuocXacThucVoiVNeID { get; set; }
    public string? DuocThanhToanTrucTuyen { get; set; }
    public string? LoaiDinhDanh { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? MaTTHC { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? TenLinhVuc { get; set; }
    public string? TenTruongHop { get; set; }
    public string? MaTruongHop { get; set; }
    public string? TruongHopId { get; set; }
    public int? ThoiGianThucHien { get; set; }
    public string? LoaiThoiGianThucHien { get; set; }
    public bool? ThongBaoEmail { get; set; } = false;
    public bool? ThongBaoZalo { get; set; } = false;
    public bool? ThongBaoSMS { get; set; } = false;
    public string? NguoiXuLyTiep { get; set; }
    public string? BuocXuLyTiep { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? NguoiDaXuLy { get; set; }
    public string? MucDo { get; set; }
    public int? SoBoHoSo { get; set; }
    public string? TenBuocHienTai { get; set; }
    public string? BuocHienTai { get; set; }
    public string? NguoiXuLyTruoc { get; set; }
    public string? BuocXuLyTruoc { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? YKienNguoiChuyenXuLy { get; set; }
    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }
    public string? NguoiDangXuLy { get; set; }
    public string? EFormData { get; set; }
    public string? EFormKetQuaData { get; set; }

    public List<ThanhPhanHoSoUpdate>? ThanhPhanHoSos { get; set; }
    public List<string>? DeletedThanhPhanIds { get; set; }
}
