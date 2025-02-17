using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
public sealed record RestoreDiaBanCommand(Guid Id) : ICommand;
