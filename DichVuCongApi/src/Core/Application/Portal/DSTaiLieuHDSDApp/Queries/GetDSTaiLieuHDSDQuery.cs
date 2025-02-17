using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Queries;
public sealed record GetDSTaiLieuHDSDQuery(DefaultIdType Id) : IQuery<DSTaiLieuHDSD>;
