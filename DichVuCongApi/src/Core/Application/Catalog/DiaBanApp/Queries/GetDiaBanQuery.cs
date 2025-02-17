using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
public sealed record GetDiaBanQuery(Guid Id) : IQuery<DiaBan>;
