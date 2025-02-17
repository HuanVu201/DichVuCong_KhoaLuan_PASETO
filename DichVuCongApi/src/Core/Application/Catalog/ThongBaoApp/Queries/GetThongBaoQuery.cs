using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Queries;
public sealed record GetThongBaoQuery(Guid Id) : IQuery<ThongBao>;
