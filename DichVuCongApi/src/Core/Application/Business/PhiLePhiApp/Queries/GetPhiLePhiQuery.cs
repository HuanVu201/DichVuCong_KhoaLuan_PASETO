using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Queries;
public sealed record GetPhiLePhiQuery(DefaultIdType Id) : IQuery<PhiLePhiDetailDto>;
