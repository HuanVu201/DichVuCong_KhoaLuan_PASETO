using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Queries;
public sealed record GetKetQuaLienQuanQuery(DefaultIdType Id) : IQuery<KetQuaLienQuan>;
