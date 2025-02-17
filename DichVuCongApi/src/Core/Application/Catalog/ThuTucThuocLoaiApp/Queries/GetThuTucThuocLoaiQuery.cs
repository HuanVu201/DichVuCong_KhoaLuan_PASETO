using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;
public sealed record GetThuTucThuocLoaiQuery(Guid Id) : IQuery<ThuTucThuocLoai>;
