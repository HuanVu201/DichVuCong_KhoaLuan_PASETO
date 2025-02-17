using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
public class AddCauHoiPhoBienCommand : ICommand<DefaultIdType>
{
    public string TieuDe { get; set; }
    public string NoiDungCauHoi { get; set; }

    public string? NoiDungTraLoi { get; set; }
    public string Type { get; set; }


}
