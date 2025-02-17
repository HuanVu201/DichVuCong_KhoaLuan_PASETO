using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp.Queries;
public sealed record GetNhomNguoiDungQuery(Guid Id) : IQuery<NhomNguoiDung>;
