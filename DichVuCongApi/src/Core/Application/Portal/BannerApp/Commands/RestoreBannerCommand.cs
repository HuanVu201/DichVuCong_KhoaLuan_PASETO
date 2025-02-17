using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.BannerApp.Commands;
public sealed record RestoreBannerCommand(DefaultIdType Id) : ICommand;
