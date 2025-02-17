using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Queries;
public sealed record GetNgayNghiQuery(Guid Id) : IQuery<NgayNghi>;
