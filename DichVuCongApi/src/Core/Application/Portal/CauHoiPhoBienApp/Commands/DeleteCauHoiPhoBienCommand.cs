using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
public sealed class DeleteCauHoiPhoBienCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool ForceDelete { get; set; }
}
