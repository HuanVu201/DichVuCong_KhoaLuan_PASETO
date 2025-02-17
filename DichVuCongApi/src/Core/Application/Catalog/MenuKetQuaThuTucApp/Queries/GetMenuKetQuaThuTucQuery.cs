using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Queries;
public sealed record GetMenuKetQuaThuTucQuery(Guid Id) : IQuery<MenuKetQuaThuTuc>;
