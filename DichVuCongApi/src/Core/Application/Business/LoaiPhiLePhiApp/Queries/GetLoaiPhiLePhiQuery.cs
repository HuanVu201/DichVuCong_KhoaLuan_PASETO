using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Queries;
public sealed record GetLoaiPhiLePhiQuery(DefaultIdType Id) : IQuery<LoaiPhiLePhi>;
