using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Queries;
public sealed record GetQuyTrinhXuLyQuery(DefaultIdType Id) : IQuery<QuyTrinhXuLy>;
