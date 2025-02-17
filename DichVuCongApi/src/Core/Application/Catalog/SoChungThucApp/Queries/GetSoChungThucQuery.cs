using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;
public sealed record GetSoChungThucQuery(Guid Id) : IQuery<SoChungThuc>;
