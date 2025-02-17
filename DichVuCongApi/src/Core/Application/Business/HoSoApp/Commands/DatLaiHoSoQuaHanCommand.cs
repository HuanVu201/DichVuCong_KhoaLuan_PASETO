using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiHoSoQuaHanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
}
