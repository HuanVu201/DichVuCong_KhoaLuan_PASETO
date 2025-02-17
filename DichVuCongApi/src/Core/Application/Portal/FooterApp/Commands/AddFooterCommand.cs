using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Commands;
public class AddFooterCommand : ICommand<DefaultIdType>
{
    public string TieuDe { get; set; }
    public string? ImageUrl { get; set; }
    public string NoiDung { get; set; }

}
