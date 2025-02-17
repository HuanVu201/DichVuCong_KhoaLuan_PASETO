using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Queries;
public sealed record GetPhanAnhKienNghiQuery(DefaultIdType Id) : IQuery<PhanAnhKienNghi>;
