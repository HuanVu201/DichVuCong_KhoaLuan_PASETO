using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Commands;
public sealed class DeleteQuanLyVanBanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool ForceDelete { get; set; }
}
