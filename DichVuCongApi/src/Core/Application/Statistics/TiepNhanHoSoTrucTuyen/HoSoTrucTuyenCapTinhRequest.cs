using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;
public sealed class HoSoTrucTuyenCapTinhRequest :BaseStatistisRequestModel, IRequest<TiepNhanHoSoTrucTuyenResponse>
{
}

