using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
public class PhieuKhaoSatDto
{
    public DefaultIdType Id { get; set; }
    public string? DonVi { get; set; }
    public string? DonViText { get; set; }
    public string? MaHoSo { get; set; }
    public string? GroupName { get; set; }
    public DateTime? NgayTao { get; set; }
    public string? ChiSo1 { get; set; }
    public string? ChiSo2 { get; set; }
    public string? ChiSo3 { get; set; }
    public string? ChiSo4 { get; set; }
    public string? ChiSo5 { get; set; }
    public string? ChiSo6 { get; set; }
    public string? ChiSo7 { get; set; }
    public string? ChiSo8 { get; set; }
    public string? ChiSo9 { get; set; }
    public string? ChiSo10 { get; set; }
    public string? ChiSo11 { get; set; }
    public string? HinhThucDanhGia { get; set; }
    public string? MucDoRHL { get; set; }
    public string? MucDoHL { get; set; }
    public string? MucDoBT { get; set; }
    public string? MucDoKHL { get; set; }
    public string? MucDoRKHL { get; set; }
    public string? NguoiNhapDanhGia { get; set; }
    public string? NguoiNhapDanhGiaText { get; set; }
    public string? LoaiNhom { get; set; }
    public string? PhongBan { get; set; }
    public string? PhongBanText { get; set; }
    public bool? HoanThanhDanhGia { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
