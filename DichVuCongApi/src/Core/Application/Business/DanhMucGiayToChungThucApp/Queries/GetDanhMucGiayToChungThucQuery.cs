using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Queries;
public sealed record GetDanhMucGiayToChungThucQuery(DefaultIdType Id) : IQuery<DanhMucGiayToChungThuc>;
