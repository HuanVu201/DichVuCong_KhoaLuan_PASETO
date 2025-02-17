using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Queries;
public sealed record GetTaiKhoanThuHuongQuery(Guid Id) : IQuery<TaiKhoanThuHuong>;
