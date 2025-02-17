
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
public sealed record GetYeuCauThanhToanByMaQuery(string ma) : IQuery<YeuCauThanhToanDetailDto>;

