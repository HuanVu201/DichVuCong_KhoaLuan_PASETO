using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;
public sealed record RestoreTrangThaiCommand(Guid Id) : ICommand;
