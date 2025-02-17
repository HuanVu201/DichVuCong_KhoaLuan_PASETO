using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public record class CancelBienLaiDienTuCommand(Guid? IdYeuCauThanhToan, string loaiPhi) : ICommand;