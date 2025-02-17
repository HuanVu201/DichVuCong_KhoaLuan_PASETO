using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Queries;
public sealed record GetLoaiThuTucQuery(Guid Id) : IQuery<LoaiThuTuc>;
