using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Classes;
using System.Text.Json.Serialization;
namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class AddHoSoCommand : RemoveFileWithJob, ICommand<DefaultIdType>
{
    //public string? ThuTucId { get; set; } // MaTTHC
    public string? DonViId { get; set; }
    public string? MaHoSo { get; set; }
    public string? TinhThanhDiaBan { get; set; }
    public string? QuanHuyenDiaBan { get; set; }
    public string? XaPhuongDiaBan { get; set; }
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
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public string? MaTrangThaiHoSo { get; set; }
    public DateTime? NgayTra { get; set; }
    public string? HinhThucTra { get; set; }
    public DateTime? NgayKetThucXuLy { get; set; }
    public string? GhiChu { get; set; }
    public string? NoiNopHoSo { get; set; }
    public string? HoSoCoThanhPhanSoHo { get; set; }
    public string? TaiKhoanDuocXacThucVoiVNeID { get; set; }
    public string? DuocThanhToanTrucTuyen { get; set; }
    public DateTime? NgayTuChoi { get; set; }
    public string? LoaiDinhDanh { get; set; }
    public string? SoDinhDanh { get; set; }
    public DateTime? NgayNopHoSo { get; set; }
    public string MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
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
    public string? NguoiGui { get; set; }
    public string? EFormData { get; set; }

    public string? MucDo { get; set; }
    public int? SoBoHoSo { get; set; }
    public string? TenBuocHienTai { get; set; }
    public string? BuocHienTai { get; set; }
    public string? NguoiXuLyTruoc { get; set; }
    public string? BuocXuLyTruoc { get; set; }
    public bool? LaHoSoChungThuc { get; set; } = false;

    /// <summary>
    /// Đầu vào của bảng yêu cầu thanh toán
    /// </summary>
    public int? TongTien { get; set; }
    public int? PhiThu { get; set; }
    public int? LePhiThu { get; set; }
    public string? HinhThucThu { get; set; }
    public string? ChiTietPhiLePhi { get; set; } // lưu vào ChiTiet, dạng PhiLePhiDto
    // end

    /// <summary>
    /// đầu vào của bảng quá trình xử lý hồ sơ
    /// </summary>
    public string? NodeQuyTrinh { get; set; }
    public int? ThoiHanBuocXuLy { get; set; }
    public string? LoaiThoiHanBuocXuLy { get; set; }
    //public string? NgayHetHanBuocXuLy { get; set; }
    //public string? ThaoTac { get; set; }
    // end

    /// <summary>
    /// Thành phần hồ sơ
    /// </summary>
    public List<AddThanhPhanHoSoCommand>? ThanhPhanHoSos { get; set; }

    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? YKienNguoiChuyenXuLy { get; set; }
    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }
    [JsonIgnore]
    public bool CheckKySo { get; set; } = true;

    public string? DonViPhiDiaGioi { get; set; }
    public string? NguoiNhanPhiDiaGioi { get; set; }
}
