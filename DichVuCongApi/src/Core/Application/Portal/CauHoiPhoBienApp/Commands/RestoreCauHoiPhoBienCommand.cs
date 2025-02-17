using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
public sealed record RestoreCauHoiPhoBienCommand(DefaultIdType Id) : ICommand;
