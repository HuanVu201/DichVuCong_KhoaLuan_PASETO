using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction;


public class XuatPhieuBanGiaoKetQuaResponseDto : IDto
{
    public string? UrlPhoi { get; set; }
    public string? IdQrCode { get; set; }
    public string? TenTinh { get; set; }

    public List<XuatPhieuBanGiaoKetQuaDto> HoSos { get; set; }

    public XuatPhieuBanGiaoKetQuaResponseDto()
    {
        HoSos = new List<XuatPhieuBanGiaoKetQuaDto>();
    }
}

public class XuatPhieuBanGiaoKetQuaDto
{
    public DefaultIdType Id { get; set; }
    
    public string? MaHoSo { get; set; }
    public string? MaTTHC { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? ChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? KenhThucHien { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaTinh { get; set; }
    public string? DonViId { get; set; }
    public string? Catalog { get; set; }
    public string? GroupName { get; set; }
    public bool? TrangThaiPhiLePhi { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public string? LoaiKetQua { get; set; }
    public DateTime? NgayXacNhanKetQua { get; set; }

}

public class XuatPhieu_User
{
    public string Id { get; set; }
    public string FullName { get; set; }
    public string? MaTinh { get; set; }
}

