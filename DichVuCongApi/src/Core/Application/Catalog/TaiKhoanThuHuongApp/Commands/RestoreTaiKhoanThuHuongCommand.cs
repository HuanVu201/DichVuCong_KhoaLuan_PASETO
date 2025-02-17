
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Commands;
public sealed record RestoreTaiKhoanThuHuongCommand(Guid Id) : ICommand;
