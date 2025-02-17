using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ScreenActionApp.Queries;
public sealed record GetScreenActionQuery(DefaultIdType Id) : IQuery<Domain.Business.ScreenAction>;
