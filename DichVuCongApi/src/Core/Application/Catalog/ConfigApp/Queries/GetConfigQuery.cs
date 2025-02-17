using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
public sealed record GetConfigQuery(Guid Id) : IQuery<Config>;
