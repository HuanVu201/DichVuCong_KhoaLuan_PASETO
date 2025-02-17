using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Commands;
public sealed class DeleteFooterCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool ForceDelete { get; set; }
}
