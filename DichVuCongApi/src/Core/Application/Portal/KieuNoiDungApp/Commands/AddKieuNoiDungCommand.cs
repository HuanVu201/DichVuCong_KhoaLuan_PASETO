using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Commands;
public class AddKieuNoiDungCommand : ICommand<Guid>
{
    public string TenNoiDung { get; set; }
    public bool? ChoPhepNhapNoiDung { get; set; }
    public bool? ChoPhepNhapLoaiLienKet { get; set; }
    public bool? ChoPhepNhapTinBai { get; set; }
}
