
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Commands;
public sealed record RestoreMenuKetQuaThuTucCommand(Guid Id) : ICommand;
