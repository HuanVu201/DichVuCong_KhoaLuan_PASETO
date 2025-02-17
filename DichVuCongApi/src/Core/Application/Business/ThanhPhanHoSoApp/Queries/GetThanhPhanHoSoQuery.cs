using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
public sealed record GetThanhPhanHoSoQuery(DefaultIdType Id) : IQuery<ThanhPhanHoSo>;
