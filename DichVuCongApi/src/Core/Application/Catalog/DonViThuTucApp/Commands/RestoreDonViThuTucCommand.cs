
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public sealed record RestoreDonViThuTucCommand(Guid Id) : ICommand;
