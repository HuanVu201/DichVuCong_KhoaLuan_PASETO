using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Dto;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public sealed record GetThuTucByMaQuery(string MaTTHC) : IQuery<DetailThuTucDto>;
