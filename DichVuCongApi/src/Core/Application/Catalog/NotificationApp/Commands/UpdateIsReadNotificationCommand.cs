using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
public class UpdateIsReadNotificationCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType Id { get; set; }
}
