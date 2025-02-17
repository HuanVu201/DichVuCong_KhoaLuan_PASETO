using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Queries;
public sealed record GetDanhMucChungQuery(Guid Id) : IQuery<DanhMucChung>;
