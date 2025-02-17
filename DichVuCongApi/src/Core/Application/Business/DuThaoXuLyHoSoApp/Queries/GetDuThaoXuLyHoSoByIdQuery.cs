using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Dtos;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Queries;
public sealed record GetDuThaoXuLyHoSoByIdQuery(Guid Id) : IQuery<DuThaoXuLyHoSoDto>;