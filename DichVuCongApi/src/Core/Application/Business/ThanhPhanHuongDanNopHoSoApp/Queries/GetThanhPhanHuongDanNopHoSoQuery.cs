using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Queries;
public sealed record GetThanhPhanHuongDanNopHoSoQuery(DefaultIdType Id) : IQuery<ThanhPhanHuongDanNopHoSo>;
