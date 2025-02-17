using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Commands;
public sealed class DeleteQuaTrinhTraoDoiCongDanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
}
