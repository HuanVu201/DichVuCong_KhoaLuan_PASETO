
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Commands;
public sealed record RestoreThongBaoCommand(Guid Id) : ICommand;
