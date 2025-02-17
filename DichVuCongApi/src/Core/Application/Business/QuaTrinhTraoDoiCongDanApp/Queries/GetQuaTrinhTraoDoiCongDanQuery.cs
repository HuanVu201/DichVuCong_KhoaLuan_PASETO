using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Queries;
public sealed record GetQuaTrinhTraoDoiCongDanQuery(DefaultIdType Id) : IQuery<QuaTrinhTraoDoiCongDan>;
