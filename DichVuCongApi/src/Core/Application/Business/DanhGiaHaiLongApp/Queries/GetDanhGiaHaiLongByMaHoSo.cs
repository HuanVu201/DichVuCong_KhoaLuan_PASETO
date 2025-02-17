using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
public sealed record GetDanhGiaHaiLongByMaHoSo(string? MaHoSo) : IQuery<DanhGiaHaiLongDetailDto>;