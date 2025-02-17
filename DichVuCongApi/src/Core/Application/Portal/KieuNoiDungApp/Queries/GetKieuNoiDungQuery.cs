using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;
public sealed record GetKieuNoiDungQuery(Guid Id) : IQuery<KieuNoiDungDto>;
