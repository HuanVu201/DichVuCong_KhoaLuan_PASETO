using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Commands;
public sealed record RestoreQuanLyTaiNguyenCommand(DefaultIdType Id) : ICommand;
