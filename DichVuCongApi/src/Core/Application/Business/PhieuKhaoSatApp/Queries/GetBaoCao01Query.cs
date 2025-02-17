using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
public sealed record GetBaoCao01Query(Guid Id) : IQuery<BaoCao01Dto>;

