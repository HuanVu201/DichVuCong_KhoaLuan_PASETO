using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Queries;
public sealed record GetKenhTinQuery(string Id) : IQuery<DetailKenhTinDto>;

