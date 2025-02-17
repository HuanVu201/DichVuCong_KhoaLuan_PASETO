using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public sealed class AddCanBoTiepNhanHoSoCommand : ICommand
{
    public List<Guid> HoSoIds { get; set; }
    public List<Guid> CanBoIds { get; set; }
}