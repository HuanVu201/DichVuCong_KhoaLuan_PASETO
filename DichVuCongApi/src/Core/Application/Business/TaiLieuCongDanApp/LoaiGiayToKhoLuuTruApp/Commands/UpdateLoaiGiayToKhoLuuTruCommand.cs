using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Commands;
public sealed class UpdateLoaiGiayToKhoLuuTruCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ma { get; set; }
    public string? Ten { get; set; }
    public string? Eform { get; set; }
    public bool? SuDung { get; set; }
}
