using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
public sealed record GetTruongHopThuTucQuery(DefaultIdType Id) : IQuery<TruongHopThuTuc>;
