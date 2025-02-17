using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;
public sealed record RestorePhiLePhiCommand(DefaultIdType Id) : ICommand;
