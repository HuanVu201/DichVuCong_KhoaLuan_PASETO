using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Queries;
public sealed record GetChuKySoCaNhanQuery(Guid Id) : IQuery<ChuKySoCaNhan>;