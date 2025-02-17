using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Commands;
public sealed record RestoreHoiDapCommand(DefaultIdType Id) : ICommand;
