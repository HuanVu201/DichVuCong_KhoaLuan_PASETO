using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Queries;
public sealed record GetTrangThaiQuery(string Id) : IQuery<TrangThai>;

