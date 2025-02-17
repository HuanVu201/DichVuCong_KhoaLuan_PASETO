using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Commands;
public sealed class DeleteKetQuaThuTucCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
}
