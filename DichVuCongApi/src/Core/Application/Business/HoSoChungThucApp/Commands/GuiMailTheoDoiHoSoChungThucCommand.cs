using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;

public class GuiMailTheoHoSoChungThucCommand : ICommand
{
    public DefaultIdType? Id { get; set; }
}