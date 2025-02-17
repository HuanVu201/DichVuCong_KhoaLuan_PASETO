using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ActionApp.Dtos;

namespace TD.DichVuCongApi.Application.Business.ActionApp.Queries;
public sealed record GetActionQuery(DefaultIdType Id) : IQuery<DetailActionDto>;
