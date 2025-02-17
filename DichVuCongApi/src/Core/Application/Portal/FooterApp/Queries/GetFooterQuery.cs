using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Queries;
public sealed record GetFooterQuery(DefaultIdType Id) : IQuery<Footer>;
