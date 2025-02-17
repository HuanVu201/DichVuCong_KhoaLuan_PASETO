using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;
public sealed record RestoreKenhTinCommand(Guid Id) : ICommand;
