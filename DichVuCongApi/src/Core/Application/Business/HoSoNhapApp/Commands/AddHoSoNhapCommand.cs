using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Classes;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class AddHoSoNhapCommand : RemoveFileWithJob, ICommand<DefaultIdType>
{
    public string? DonViQuanLy { get; private set; }
    public bool? ChoXacNhan { get; private set; } = false;
    public string? DonViId { get; set; }
    public string? LoaiDoiTuong { get; set; }
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
    public string? TinhThanhNguoiUyQuyen { get; set; }
    public string? QuanHuyenNguoiUyQuyen { get; set; }
    public string? XaPhuongNguoiUyQuyen { get; set; }
    public string? DiaChiNguoiUyQuyen { get; set; }
    public string? NguoiGui { get; set; }

    public string? TrichYeuHoSo { get; set; }
    public string? HinhThucTra { get; set; }
    public string MaTTHC { get; set; }
    public string MucDo { get; set; }
    public string? TenTTHC { get; set; }
    public string? TenTruongHop { get; set; }
    public string? MaTruongHop { get; set; }
    public string? TruongHopId { get; set; }

    public string? EFormData { get; set; }
    public bool? LaHoSoChungThuc { get; set; } = false;
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public List<AddThanhPhanHoSoCommand>? ThanhPhanHoSos { get; set; }
}
