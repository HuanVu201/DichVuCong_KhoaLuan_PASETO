
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;
public sealed record RestoreLinhVucCommand(Guid Id) : ICommand;
