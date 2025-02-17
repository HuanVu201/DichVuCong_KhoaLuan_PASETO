using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Commands;
public class AddTinBaiCommand : ICommand<Guid>
{
    public string TieuDe { get; set; }
    public DateTime NgayBanHanh { get; set; }
    public DateTime? NgayKetThuc { get; set; }
    public string? TrichYeu { get; set; }
    public string? NoiDung { get; set; }
    public string? NguonTin { get; set; }
    public Guid KenhTin { get; set; }
    public Guid TrangThai { get; set; }
    public string? AnhDaiDien { get; set; }
    public string? FileDinhKem { get; set; }
    public string? Tacgia { get; set; }
    public bool? ChoPhepBinhLuan { get; set; }
    public bool? HienThiLenTrangChu { get; set; }
    public bool? TinNoiBat { get; set; }
}
