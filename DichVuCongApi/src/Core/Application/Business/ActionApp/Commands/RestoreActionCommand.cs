using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ActionApp.Commands;
public sealed record RestoreActionCommand(DefaultIdType Id) : ICommand;
