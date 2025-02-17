using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Queries;
public sealed record GetHoiDapQuery(DefaultIdType Id) : IQuery<HoiDap>;
