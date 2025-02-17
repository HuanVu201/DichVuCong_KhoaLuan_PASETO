using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
public sealed record GetMenuQuery(Guid Id) : IQuery<Menu>;
