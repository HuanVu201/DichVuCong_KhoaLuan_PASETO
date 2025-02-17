using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Commands;
public class AddHuongDanSuDungCommand : ICommand<DefaultIdType>
{
    public int ThuTu {  get; set; }
    public string? TenHuongDanSuDung {  get; set; }
    public string? NoiDungHuongDanSuDung {  get; set; }

}
