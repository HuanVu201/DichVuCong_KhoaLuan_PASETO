using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands.ChamSoHoa;
public class CapNhatThanhPhanHoSoCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool? SaveAndForward { get; set; } = false;
    public List<ThanhPhanHoSoUpdate>? ThanhPhanHoSos { get; set; }
}
