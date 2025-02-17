using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Commands;
public sealed record RestoreFooterCommand(DefaultIdType Id) : ICommand;
