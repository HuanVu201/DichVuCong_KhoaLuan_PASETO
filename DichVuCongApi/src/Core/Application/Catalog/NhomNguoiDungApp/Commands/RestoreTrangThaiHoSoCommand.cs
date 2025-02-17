
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp.Commands;
public sealed record RestoreNhomNguoiDungCommand(Guid Id) : ICommand;
