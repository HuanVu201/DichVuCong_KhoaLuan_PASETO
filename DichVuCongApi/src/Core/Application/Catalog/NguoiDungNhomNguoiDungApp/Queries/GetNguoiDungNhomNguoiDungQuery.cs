using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;
public sealed record GetNguoiDungNhomNguoiDungQuery(DefaultIdType Id) : IQuery<NguoiDungNhomNguoiDung>;
