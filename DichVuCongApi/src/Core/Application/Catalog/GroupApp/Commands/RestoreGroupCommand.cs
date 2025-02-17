
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
public sealed record RestoreGroupCommand(Guid Id) : ICommand;
