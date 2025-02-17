using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public sealed record InitBienLaiDienTuQuery(Guid? IdYeuCauThanhToan, string loaiPhi): IQuery<BienLaiDienTuDto>;
