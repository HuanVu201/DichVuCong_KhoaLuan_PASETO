using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
public sealed record GetDanhGiaHaiLongQuery(DefaultIdType Id) : IQuery<DanhGiaHaiLongDetailDto>;
