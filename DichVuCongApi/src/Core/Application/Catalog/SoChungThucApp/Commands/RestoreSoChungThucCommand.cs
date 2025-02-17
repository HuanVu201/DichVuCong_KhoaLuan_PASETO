using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
public sealed record RestoreSoChungThucCommand(Guid Id) : ICommand;
