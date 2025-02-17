using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public sealed record InitMultiBienLaiDienTu(List<DefaultIdType> IdYeuCauThanhToans, string loaiPhi): IQuery<List<BienLaiDienTuDto>>;
