using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Queries;
public sealed record GetQuaTrinhXuLyHoSoQuery(DefaultIdType Id) : IQuery<QuaTrinhXuLyHoSoDetailDto>;
