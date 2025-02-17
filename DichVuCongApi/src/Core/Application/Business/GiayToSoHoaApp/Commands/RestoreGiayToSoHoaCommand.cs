using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
public sealed record RestoreGiayToSoHoaCommand(DefaultIdType Id) : ICommand;
