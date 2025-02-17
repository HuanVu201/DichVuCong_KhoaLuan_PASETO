using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Queries;
public sealed record GetCauHoiPhoBienQuery(DefaultIdType Id) : IQuery<CauHoiPhoBien>;
