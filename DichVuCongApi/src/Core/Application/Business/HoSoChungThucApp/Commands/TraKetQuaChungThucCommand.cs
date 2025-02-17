using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
public class TraKetQuaChungThucCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
}
