using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
public sealed record RestoreMaVanDonBuuDienCommand(Guid Id) : ICommand;
