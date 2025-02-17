using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ScreenApp.Commands;
public sealed record RestoreScreenCommand(DefaultIdType Id) : ICommand;
