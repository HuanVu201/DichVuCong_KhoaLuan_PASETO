using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public sealed record ChiTietBoSungHoSoQuery(Guid Id) : IQuery<ChiTietBoSungHoSoDto>;

