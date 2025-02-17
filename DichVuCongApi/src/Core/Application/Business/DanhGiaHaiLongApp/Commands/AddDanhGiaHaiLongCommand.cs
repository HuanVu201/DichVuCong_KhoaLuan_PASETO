using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
public class AddDanhGiaHaiLongCommand : ICommand<DefaultIdType>
{
    public string? MaHoSo { get; set; }
    public string? LoaiDanhGia { get; set; }
    public string? NguoiDanhGia { get; set; }
    public string? NoiDungDanhGia { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public string? DanhGia { get; set; }
}
