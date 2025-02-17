using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;
public class XuatPhieuBienNhanKetQuaCommand : IQuery<object>
{
    public DefaultIdType Id { get; set; }
    public string? TenGiayTo { get; set; }
    public string? MaLoaiPhieu { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? Code { get; set; }
}

public class XuatPhieuBienNhanKetQuaDto : IDto
{
    public Guid? IdGiayToHoSo { get; set; }
    public string? UrlPhieu { get; set; }
    public string? UrlPhoi { get; set; }
    public string? IdQrCode { get; set; }
    public string? DocxPhieu { get; set; }
    public DefaultIdType Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? DonViId { get; set; }
    public string? ChuHoSo { get; set; }
    public string? GroupName { get; set; }
    public string? GroupCode { get; set; }
    public string? Catalog { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    public string? SoDienThoaiDonVi { get; set; }
    public string? MaTinh { get; set; }
    public string? TenTinh { get; set; }
    public string? LoaiVanBanKetQua { get; set; }
    public string? SoKyHieuKetQua { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? MaTTHC { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public DateTime? NgayTra { get; set; }
    public string? TenTTHC { get; set; }
    public string? LoaiNguoiNhanKetQua { get; set; }
    public string? HoTenNguoiNhanKetQua { get; set; }
    public string? SoDienThoaiNguoiNhanKetQua { get; set; }

}

