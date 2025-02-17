using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class HoSoTiepNhanQuaHanDto
{
    public DefaultIdType Id { get; set; }
    public string MaHoSo { get; set; } = string.Empty;
    public string NgayTiepNhan { get; set; } = string.Empty;
    public string ChuHoSo { get; set; } = string.Empty;
    public string SoDienThoaiChuHoSo { get; set; } = string.Empty;
    public string EmailChuHoSo { get; set; } = string.Empty;
    public string SoGiayToChuHoSo { get; set; } = string.Empty;
    public string TrichYeuHoSo { get; set; } = string.Empty;
    public string NgayTra { get; set; } = string.Empty;
    public string NgayNopHoSo { get; set; } = string.Empty;
    public string NgayHenTra { get; set; } = string.Empty;
    public string CreatedOn { get; set; } = string.Empty;
    public string KenhThucHien { get; set; } = string.Empty;
    public string TenDonVi { get; set; } = string.Empty;
    public string DonViId { get; set; } = string.Empty;
    public string DiaChiChuHoSo { get; set; } = string.Empty;
    public string TenTTHC { get; set; } = string.Empty;
    public string MaTTHC { get; set; } = string.Empty;
    public string NguoiNhanHoSo { get; set; } = string.Empty;
    public string TenNguoiNhanHoSo { get; set; } = string.Empty;
    public string TrangThaiHoSoId { get; set; } = string.Empty;
    public string TenTrangThaiHoSo { get; set; } = string.Empty;
    public string TenDiaBan { get; set; } = string.Empty;
    [JsonIgnore]
    public int TotalCount { get; set; }
}
