using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;
public sealed record GetGiaoDichThanhToanQuery(DefaultIdType Id) : IQuery<GiaoDichThanhToan>;
