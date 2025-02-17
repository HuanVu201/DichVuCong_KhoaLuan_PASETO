using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
public sealed class DeleteLoaiNhomGiayToCaNhanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool ForceDelete { get; set; }
}
