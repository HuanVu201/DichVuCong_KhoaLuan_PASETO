using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
public sealed record RestoreLoaiPhiLePhiCommand(DefaultIdType Id) : ICommand;
