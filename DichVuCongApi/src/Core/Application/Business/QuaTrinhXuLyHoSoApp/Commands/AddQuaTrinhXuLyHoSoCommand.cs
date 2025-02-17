using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Commands;
public class AddQuaTrinhXuLyHoSoCommand : ICommand<DefaultIdType>
{
    public string MaHoSo { get; set; }
    public DateTime? ThoiGian { get; set; }
    public string TrangThai { get; set; }
    public string NodeQuyTrinh { get; set; }
    public string NguoiGui { get; set; }
    public string? NguoiNhan { get; set; }
    public int ThoiHanBuocXuLy { get; set; }
    public string LoaiThoiHanBuocXuLy { get; set; }
    public DateTime NgayHetHanBuocXuLy { get; set; }
    public string ThaoTac { get; set; }
    public string? NoiDung { get; set; }
    public string? DinhKem { get; set; }
    public string? TrangThaiDongBoDVCQuocGia { get; set; }
    public string? TenNguoiGui { get; set; }
    public string? TenNguoiNhan { get; set; }
}
