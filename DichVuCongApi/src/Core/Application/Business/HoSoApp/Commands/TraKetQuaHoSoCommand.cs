using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TraKetQuaHoSoCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public bool? YeuCauBCCILayKetQua { get; set; }
}
