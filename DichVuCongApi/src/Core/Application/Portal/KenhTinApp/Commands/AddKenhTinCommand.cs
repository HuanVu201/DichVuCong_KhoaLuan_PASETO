
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;
public class AddKenhTinCommand : ICommand<Guid>
{
    public string TenKenhTin { get; set; }
    public Nullable<Guid> MaKenhTinCha { get; set; }
    public string? TomTat { get; set; }
    public int ThuTu { get; set; }
    public string? ImageUrl { get; set; }
    public Guid KieuNoiDungId { get; set; }
    public bool? HienThiMenuChinh { get; set; }
    public bool? HienThiMenuDoc { get; set; }
    public bool? HienThiMenuPhu { get; set; }
    public string? NoiDung { get; set; }
    public string? LoaiMoLienKet { get; set; }
    public string? LienKetNgoai { get; set; }
}
