using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;
public sealed class DeleteTrangThaiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool ForceDelete { get; set; }
}
