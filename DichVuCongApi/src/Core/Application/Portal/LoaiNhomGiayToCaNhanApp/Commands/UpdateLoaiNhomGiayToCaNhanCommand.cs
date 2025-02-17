using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
public class UpdateLoaiNhomGiayToCaNhanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ten { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? GhiChu { get; set; }
    public string? Loai { get; set; }
}