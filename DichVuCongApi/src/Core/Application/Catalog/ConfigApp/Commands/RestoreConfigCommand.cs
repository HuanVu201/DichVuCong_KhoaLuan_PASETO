
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ConfigApp.Commands;
public sealed record RestoreConfigCommand(Guid Id) : ICommand;
