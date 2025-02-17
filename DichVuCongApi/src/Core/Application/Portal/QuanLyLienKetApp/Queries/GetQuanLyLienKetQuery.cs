using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Queries;
public sealed record GetQuanLyLienKetQuery(DefaultIdType Id) : IQuery<QuanLyLienKet>;
