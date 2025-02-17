using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp.Queries;
public sealed record GetTinBaiQuery(string Id) : IQuery<DetailTinBaiDto>;
