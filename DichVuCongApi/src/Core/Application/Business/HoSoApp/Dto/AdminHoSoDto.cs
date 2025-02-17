using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class AdminHoSoDto
{
    public DefaultIdType Id { get; set; }
    public string? DonViId { get; set; }

    public string? MaHoSo { get; set; }
    public string? LoaiVanBanKetQua { get; set; }
    public string SoKyHieuKetQua { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? NguoiKyKetQua { get; set; }
    public DateTime? NgayBanHanhKetQua { get; set; }
    public DateTime? NgayKyKetQua { get; set; }
    public string? CoQuanBanHanhKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public bool? ChoXacNhan { get; set; }
    public bool? LaHoSoChungThuc { get; set; }

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


    public string? TrangThaiHoSoId { get; set; }
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

  


    public string? YKienNguoiChuyenXuLy { get; set; }

    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }


    public string? NguoiDangXuLy { get; set; }
    public bool? ChuyenNoiBo { get; set; }

    public string? LyDoXoa { get; set; }
    public DateTime? NgayTiepNhanCaNhan { get; set; }
    public DateTime? NgayHenTraCaNhan { get; set; }

    public string? TrangThaiBoSung { get; set; }

    public string? TrangThaiTruoc { get; set; }
    public DateTime? NgayYeuCauBoSung { get; set; }

    public string? LyDoBoSung { get; set; }

    public string? DinhKemBoSung { get; set; }

    public string? ThongTinTiepNhanBoSung { get; set; }
    public string? ThanhPhanBoSung { get; set; }

    public string? NguoiGui { get; set; }
    public string? EFormData { get; set; }
    public string? EFormKetQuaData { get; set; }

    public string? LyDoTuChoi { get; set; }

    public string? DinhKemTuChoi { get; set; }
    public bool? ChoBanHanh { get; set; }
    public string? KetQuaDaySangQLVB { get; set; }
    public DateTime? NgayCongDanBoSung { get; set; }
    public int? ThoiHanBoSung { get; set; }

    public string? NoiDungBoSung { get; set; }
    public bool? DaSoHoaKetQua { get; set; }

    public string? DinhKemSoHoa { get; set; }
    public string? TrangThaiTraKq { get; set; }


    public string? DonViTraKq { get; set; }
    public string? LoaiKetQua { get; set; }
    public DateTime? DeletedOn { get; set; }
    public DateTime? CreatedOn { get; set; }
    public string? DeletedBy { get; set; }
    public DefaultIdType? CreatedBy { get; set; }
}
