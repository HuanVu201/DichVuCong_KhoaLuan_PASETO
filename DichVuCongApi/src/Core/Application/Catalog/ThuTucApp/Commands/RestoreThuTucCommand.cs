
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
public sealed record RestoreThuTucCommand(Guid Id) : ICommand;
