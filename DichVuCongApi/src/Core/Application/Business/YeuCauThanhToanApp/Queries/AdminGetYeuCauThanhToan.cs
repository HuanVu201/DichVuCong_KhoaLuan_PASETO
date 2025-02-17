using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Dto;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
public sealed record AdminGetYeuCauThanhToan(Guid Id) : IQuery<AdminYeuCauThanhToanDto>;