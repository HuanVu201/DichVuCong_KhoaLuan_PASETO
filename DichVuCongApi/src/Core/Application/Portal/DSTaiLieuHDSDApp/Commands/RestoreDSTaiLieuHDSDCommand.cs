using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Commands;
public sealed record RestoreDSTaiLieuHDSDCommand(DefaultIdType Id) : ICommand;
