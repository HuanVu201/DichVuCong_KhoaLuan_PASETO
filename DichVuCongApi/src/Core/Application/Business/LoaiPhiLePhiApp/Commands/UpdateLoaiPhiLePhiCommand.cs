using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
public sealed class UpdateLoaiPhiLePhiCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Name { get; set; }
    public string? Ma { get; set; }
    public bool SuDung { get; set; }

}
