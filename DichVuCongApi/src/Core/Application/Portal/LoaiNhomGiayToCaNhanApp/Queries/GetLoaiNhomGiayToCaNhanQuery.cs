using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Queries;
public sealed record GetLoaiNhomGiayToCaNhanQuery(DefaultIdType Id) : IQuery<LoaiNhomGiayToCaNhan>;
