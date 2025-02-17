using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;

public sealed record GetMauPhoiQuery(Guid Id) : IQuery<MauPhoi>;