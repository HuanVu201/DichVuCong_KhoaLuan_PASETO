
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;
public sealed record RestoreDanhMucChungCommand(Guid Id) : ICommand;
