using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.ScreenActionApp.Commands;
public sealed class DeleteScreenActionCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool? ForceDelete { get; set; } = true;
}
