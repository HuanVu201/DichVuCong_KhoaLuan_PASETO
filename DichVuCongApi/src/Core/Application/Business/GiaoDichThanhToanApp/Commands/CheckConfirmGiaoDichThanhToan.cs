using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
public sealed record CheckConfirmGiaoDichThanhToan(DefaultIdType Id ) : ICommand<ConfirmDvcPaymentResponse>;

