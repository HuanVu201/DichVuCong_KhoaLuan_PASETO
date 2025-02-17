using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
public sealed record GetGroupQuery(Guid Id) : IQuery<Group>;
