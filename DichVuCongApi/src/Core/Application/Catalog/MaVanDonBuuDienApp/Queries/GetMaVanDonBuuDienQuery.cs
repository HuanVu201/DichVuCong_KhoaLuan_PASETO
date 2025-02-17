using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
public sealed record GetMaVanDonBuuDienQuery(Guid Id) : IQuery<MaVanDonBuuDien>;
