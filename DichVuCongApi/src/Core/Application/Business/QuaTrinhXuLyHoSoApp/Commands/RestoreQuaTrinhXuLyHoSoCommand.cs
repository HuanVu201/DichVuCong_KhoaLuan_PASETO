using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Commands;
public sealed record RestoreQuaTrinhXuLyHoSoCommand(DefaultIdType Id) : ICommand;
