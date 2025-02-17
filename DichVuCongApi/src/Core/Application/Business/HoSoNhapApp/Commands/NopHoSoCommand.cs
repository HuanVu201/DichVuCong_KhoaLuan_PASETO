using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class NopHoSoCommand : ICommand<string>
{
    [JsonIgnore]
    public DefaultIdType Id { get; set; }
}
