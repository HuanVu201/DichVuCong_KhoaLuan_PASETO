using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.BannerApp.Commands;
public class AddBannerCommand : ICommand<DefaultIdType>
{
    public string ImageUrl { get; set; }
    public bool SuDung { get; set; }

}
