using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public sealed record GetThuTucQuery(Guid Id) : IQuery<ThuTuc>;
