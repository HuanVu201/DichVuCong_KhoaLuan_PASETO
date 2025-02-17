using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
public sealed record GetPhieuKhaoSatQuery(Guid Id) : IQuery<PhieuKhaoSat>;

