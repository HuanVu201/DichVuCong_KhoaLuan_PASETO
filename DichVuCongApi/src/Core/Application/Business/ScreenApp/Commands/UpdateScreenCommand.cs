using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ScreenApp.Commands;
public sealed class UpdateScreenCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
    public bool? ShowActionInModal { get; set; }
    public bool? ShowActionInTable { get; set; } 
}
