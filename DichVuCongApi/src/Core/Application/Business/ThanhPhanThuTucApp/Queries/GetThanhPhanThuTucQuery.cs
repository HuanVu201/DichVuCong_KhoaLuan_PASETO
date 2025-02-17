using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;
public sealed record GetThanhPhanThuTucQuery(DefaultIdType Id) : IQuery<ThanhPhanThuTuc>;
