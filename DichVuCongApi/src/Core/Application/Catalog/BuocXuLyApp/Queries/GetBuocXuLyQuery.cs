using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Queries;
public sealed record GetBuocXuLyQuery(Guid Id) : IQuery<BuocXuLy>;
