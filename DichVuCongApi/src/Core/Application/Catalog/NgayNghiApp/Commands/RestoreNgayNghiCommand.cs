
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;
public sealed record RestoreNgayNghiCommand(Guid Id) : ICommand;
