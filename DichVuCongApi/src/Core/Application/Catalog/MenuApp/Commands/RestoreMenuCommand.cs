
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MenuApp.Commands;
public sealed record RestoreMenuCommand(Guid Id) : ICommand;
