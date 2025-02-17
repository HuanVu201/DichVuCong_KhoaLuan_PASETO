using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Commands;
public sealed record RestoreTinBaiCommand(Guid Id) : ICommand;

