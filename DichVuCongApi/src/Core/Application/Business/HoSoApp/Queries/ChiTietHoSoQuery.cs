using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public sealed record ChiTietHoSoQuery(Guid Id) : IQuery<ChiTietHoSoDto>;

