using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ScreenApp.Queries;
public sealed record GetScreenQuery(DefaultIdType Id) : IQuery<Screen>;
