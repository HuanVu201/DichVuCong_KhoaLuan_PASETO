using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Queries;
public sealed record GetKetQuaThuTucQuery(DefaultIdType Id) : IQuery<KetQuaThuTuc>;
