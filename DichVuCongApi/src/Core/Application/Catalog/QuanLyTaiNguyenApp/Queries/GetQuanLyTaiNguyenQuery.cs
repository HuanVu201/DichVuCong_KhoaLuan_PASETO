using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Queries;
public sealed record GetQuanLyTaiNguyenQuery(DefaultIdType Id) : IQuery<QuanLyTaiNguyen>;
