
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Commands;
public sealed record RestoreNhomThuTucCommand(Guid Id) : ICommand;
