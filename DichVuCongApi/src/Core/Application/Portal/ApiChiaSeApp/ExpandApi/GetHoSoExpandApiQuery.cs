using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public sealed record GetHoSoExpandApiQuery(DefaultIdType Id, string? View, bool? ReturnNodeQuyTrinh = false, bool? ReturnPhiLePhi = false, bool? ReturnThanhPhanThuTucs = false, bool? ReturnYeuCauThanhToan = false,  string? ApiEx = "detailHoSoEx")
    : IQuery<object>;
