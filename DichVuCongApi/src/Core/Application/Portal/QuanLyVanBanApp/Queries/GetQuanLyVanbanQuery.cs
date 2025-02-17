using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Queries;
public sealed record GetQuanLyVanBanQuery(DefaultIdType Id) : IQuery<QuanLyVanBan>;
