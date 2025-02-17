using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction;

public class XuatPhieuTiepNhanNhieuHoSoResponseDto : IDto
{
    public string? UrlPhoi { get; set; }
    public string? IdQrCode { get; set; }
    public string? TenTinh { get; set; }

    public List<XuatPhieuTiepNhanNhieuHoSoDto> HoSos { get; set; }

    public XuatPhieuTiepNhanNhieuHoSoResponseDto()
    {
        HoSos = new List<XuatPhieuTiepNhanNhieuHoSoDto>();
    }
}

public class XuatPhieuTiepNhanNhieuHoSoDto
{
    public DefaultIdType Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? DonViId { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? SoBoHoSo { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public string? NgayNopHoSo { get; set; }
    public string? NgayTiepNhan { get; set; }
    public string? NgayHenTra { get; set; }
    public string? ThoiGianThucHien { get; set; }
    public string? LoaiThoiGianThucHien { get; set; }
    public string? NguoiTiepNhan { get; set; }
    public string? NguoiNopHoSo { get; set; }
    public string? GroupName { get; set; }
    public string? Catalog { get; set; }
    public string? MaDinhDanh { get; set; }
    public bool? UyQuyen { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? DiaChiNguoiUyQuyen { get; set; }
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    public string? EmailNguoiUyQuyen { get; set; }
    public string? SoGiayToNguoiUyQuyen { get; set; }
    public string? MaTTHC { get; set; }
    public string? SoDienThoaiDonVi { get; set; }
    public string? MaTinh { get; set; }

}
