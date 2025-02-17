using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public sealed record GetHoSoQuery(DefaultIdType Id, string? View, bool? ReturnNodeQuyTrinh = false, bool? ReturnPhiLePhi = false, bool? ReturnThanhPhanThuTucs = false, bool? ReturnYeuCauThanhToan = false)
    : IQuery<object>;
