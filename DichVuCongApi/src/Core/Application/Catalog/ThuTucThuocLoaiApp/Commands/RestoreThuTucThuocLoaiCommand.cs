
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Commands;
public sealed record RestoreThuTucThuocLoaiCommand(Guid Id) : ICommand;
