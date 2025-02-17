using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ThemMoiHoSoDienTuCommand : ICommand
{
    public string MaHoSo { get; set; }
    public string MaTTHC { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string DonVi { get; set; }
    public string? KenhThucHien { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? NamSinhChuHoSo { get; set; }
    public string? TinhThanhChuHoSo { get; set; }
    public string? QuanHuyenChuHoSo { get; set; }
    public string? XaPhuongChuHoSo { get; set; }
    public string? TinhThanhNguoiUyQuyen { get; set; }
    public string? QuanHuyenNguoiUyQuyen { get; set; }
    public string? XaPhuongNguoiUyQuyen { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public bool? UyQuyen { get; set; }
    public string? NguoiDuocUyQuyen { get; set; }
    public string? SoDienThoaiNguoiDuocUyQuyen { get; set; }
    public string? EmailNguoiDuocUyQuyen { get; set; }
    public string? SoGiayToNguoiDuocUyQuyen { get; set; }
    public string? DiaChiNguoiDuocUyQuyen { get; set; }
    public List<AddThanhPhanHoSoCommand>? ThanhPhanHoSos { get; set; }
}

public class ThanhPhanThemMoiHoSoDienTu
{
    public string TenThanhPhan { get; set; }
    public int SoBanChinh { get; set; }
    public int SoBanSao { get; set; }
    public List<TepDinhKemThemMoiHoSoDienTu> TepDinhKem { get; set; }
}

public class TepDinhKemThemMoiHoSoDienTu
{
    public string Base64 { get; set; }
    public string TenTep { get; set; }
}

