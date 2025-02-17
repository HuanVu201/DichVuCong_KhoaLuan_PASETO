using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Queries;
public sealed record GetNhomThuTucQuery(Guid Id) : IQuery<NhomThuTuc>;
