using System.Diagnostics.Contracts;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp;
public class ChiTietHoSoDto : HoSoPer, IDto
{
    public ChiTietHoSoDto()
    {
        ThanhPhanHoSos = new List<ThanhPhanHoSoDto>();
    }
    public Guid Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? DonViId { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? KenhThucHien { get; set; }
    public string? SoBoHoSo { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public string? NgayNopHoSo { get; set; }
    public string? NgayTiepNhan { get; set; }
    public string? NgayHenTra { get; set; }
    public string? NgayTra { get; set; }
    public double? ThoiGianThucHien { get; set; }
    public double? ThoiGianThucHienTrucTuyen { get; set; }
    public string? LoaiThoiGianThucHien { get; set; }
    public string? NguoiTiepNhan { get; set; }
    public string? NguoiNopHoSo { get; set; }
    public string? GroupName { get; set; }
    public string? GroupCode { get; set; }
    public string? Catalog { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? HinhThucThu { get; set; }

    public string? MaTTHC { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? SoDienThoaiDonVi { get; set; }


    public List<ThanhPhanHoSoDto> ThanhPhanHoSos { get; set; }

}
