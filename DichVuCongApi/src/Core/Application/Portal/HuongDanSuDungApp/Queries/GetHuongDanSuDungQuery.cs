using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Queries;
public sealed record GetHuongDanSuDungQuery(DefaultIdType Id) : IQuery<HuongDanSuDung>;
