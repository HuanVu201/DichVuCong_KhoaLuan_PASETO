using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;
public class SoLieuThongKeDonViTheoKyRequest : IRequest<Result<SoLieuThongKeTheoDonViElement>>
{
    public string? MaDinhDanh { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
}

public static class DanhGiaHaiLongConstants
{
    public static string RatHaiLong = "RẤT HÀI LÒNG";
    public static string HaiLong = "HÀI LÒNG";
    public static string KhongHaiLong = "KHÔNG HÀI LÒNG";
}

public class SoLieuThongKeTheoDonViElement
{
    public string? MaDinhDanh { get; set; }
    public string? Catalog { get; set; }
    public string? LoaiThoiGian { get; set; }
    public int? Ky { get; set; }
    public int? Nam { get; set; }
    // Tiếp nhận
    public int TiepNhanTrongKy { get; set; } = 0;
    public int TiepNhanTrucTuyen { get; set; } = 0;
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanBCCI { get; set; } = 0;
    public double TiepNhanTrucTuyenTyLe { get; set; } = 0;

    public int TiepNhanChungThuc { get; set; } = 0;
    public int TiepNhanDVCLienThong { get; set; } = 0;

    public int TiepNhanTrucTuyenThuTucTrucTuyen { get; set; } = 0;
    public int TiepNhanThuTucTrucTuyen { get; set; } = 0;
    public double TiepNhanTrucTuyenThuTucTrucTuyenTyLe { get; set; } = 0;

    public int TuChoiTiepNhan { get; set; } = 0;
    public int HoSoThuocThamQuyenGiaiQuyet { get; set; } = 0;

    // Xử lý
    public int DaXuLy { get; set; } = 0;
    public int DaXuLyTruocHan { get; set; } = 0;
    public int DaXuLyDungHan { get; set; } = 0;
    public int DaXuLyQuaHan { get; set; } = 0;
    public double DaXuLyDungVaTruocHanTyLe { get; set; } = 0;
    public int TraLai { get; set; } = 0;
    public int TrucTuyenDaXuLy { get; set; } = 0;
    public int TrucTuyenDaXuLyTruocHan { get; set; } = 0;
    public int TrucTuyenDaXuLyDungHan { get; set; } = 0;
    public int TrucTuyenDaXuLyQuaHan { get; set; } = 0;
    public double TrucTuyenDaXuLyDungVaTruocHanTyLe { get; set; } = 0;
    public int DangXuLyDungHanVaTruocHan { get; set; } = 0;
    public int DaXuLyDungHanTruocHanVaTraLai { get; set; } = 0;
    public int HoSoDaXuLyCoKetQuaDienTu { get; set; } = 0;

    // Thanh toán
    public int ThuTucCoThuPhi { get; set; } = 0;
    public int ThuTucCoPhatSinhThanhToanTrucTuyen { get; set; } = 0;
    public double ThuTucCoPhatSinhThanhToanTrucTuyenTyLe { get; set; } = 0;

    public int HoSoCoThuPhi { get; set; } = 0;
    public int HoSoCoThuPhiThanhToanTrucTuyen { get; set; } = 0;
    public double HoSoCoThuPhiThanhToanTrucTuyenTyLe { get; set; } = 0;

    public int SoLuongGiaoDichThanhToanTrucTuyen { get; set; } = 0;
    public decimal SoTienGiaoDichThanhToanTrucTuyen { get; set; } = 0;

    // Số hóa
    public int HoSoCoDinhDanh { get; set; } = 0;
    public int HoSoCoThanhPhan { get; set; } = 0;
    public double HoSoCoThanhPhanTyLe { get; set; } = 0;
    public int HoSoDaXuLyXong { get; set; } = 0;
    public int HoSoDaXuLyXongCoKetQuaDienTu { get; set; } = 0;
    public double HoSoDaXuLyXongCoSoHoaKetQuaTyLe { get; set; } = 0;
    public int HoSoTaiSuDungSoHoaThanhPhan { get; set; } = 0;
    public int HoSoCoThanhPhanHoacKetQuaSoHoa { get; set; } = 0;

    // Thủ tục hành chính
    public int ThuTuc { get; set; } = 0;
    public int ThuTucPhatSinhHoSo { get; set; } = 0;
    public double ThuTucPhatSinhHoSoTyLe { get; set; } = 0;
    public int ThuTucTrucTuyen { get; set; } = 0;
    public int ThuTucTrucTuyenPhatSinhHoSo { get; set; } = 0;
    public double ThuTucTrucTuyenPhatSinhHoSoTyLe { get; set; } = 0;

    // CSDL Dân cư
    public int TruyVanCSDLDanCu { get; set; } = 0;

    // Đánh giá hài lòng
    public double DanhGia { get; set; } = 0;
    public double DanhGiaHaiLong { get; set; } = 0;
    public double DanhGiaRatHaiLong { get; set; } = 0;
    public double DanhGiaKhongHaiLong { get; set; } = 0;

    // Tính điểm (766)
    public double TongDiem766 { get; set; } = 0;
    public double DiemCongKhaiMinhBach { get; set; } = 6;
    public double DiemTyLeDongBoDVCQuocGia { get; set; } = 6;

    public double DiemTienDoGiaiQuyet { get; set; } = 0;

    public double DiemCungCapDVCTT { get; set; } = 0;
    public double DiemTyLeCungCapDVCTT { get; set; } = 0;
    public double DiemTyLeDVCTTPhatSinhHoSo { get; set; } = 0;
    public double DiemTyLeHoSoTTHCNopTrucTuyen { get; set; } = 0;

    public double DiemThanhToanTrucTuyen { get; set; } = 0;
    public double DiemTyLeTTHCCoGiaoDichTTTT { get; set; } = 0;
    public double DiemTyLeTTHCCoTheThanhToanTrenCongDVCQG { get; set; } = 2;
    public double DiemTyLeHoSoTTTT { get; set; } = 0;

    public double DiemSoHoa { get; set; } = 0;
    public double DiemTyLeCapKQDienTu { get; set; } = 0;
    public double DiemTyLeSoHoaHoSo { get; set; } = 0;
    public double DiemTyLeTaiSuDung { get; set; } = 0;
}
