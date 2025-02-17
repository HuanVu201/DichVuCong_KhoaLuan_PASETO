using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Commands;
public sealed class UpdateDanhMucGiayToChungThucCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ma { get; set; }
    public string? Ten { get; set; }
    public bool? SuDung { get; set; }
}
