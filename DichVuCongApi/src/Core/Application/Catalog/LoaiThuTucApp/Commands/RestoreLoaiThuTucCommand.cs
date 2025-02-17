
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;
public sealed record RestoreLoaiThuTucCommand(Guid Id) : ICommand;
