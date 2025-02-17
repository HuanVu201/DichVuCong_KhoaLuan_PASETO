using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Queries;
public sealed record GetTrangThaiHoSoQuery(DefaultIdType Id) : IQuery<TrangThaiHoSo>;
