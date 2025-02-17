using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;
public sealed record GetLogCSDLDanCuDoanhNghiepQuery(DefaultIdType Id) : IQuery<LogCSDLDanCuDoanhNghiep>;
