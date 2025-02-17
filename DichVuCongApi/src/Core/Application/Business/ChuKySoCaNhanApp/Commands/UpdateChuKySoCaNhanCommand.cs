using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Commands;
public sealed class UpdateChuKySoCaNhanCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? HinhAnh { get; set; }
    public string? MoTa { get; set; }
}
