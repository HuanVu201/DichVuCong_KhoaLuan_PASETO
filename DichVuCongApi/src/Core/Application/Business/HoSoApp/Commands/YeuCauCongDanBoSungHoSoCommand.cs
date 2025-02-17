using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class YeuCauCongDanBoSungHoSoCommand: ICommand
{
    [JsonIgnore]
    public Guid Id { get; set; }
}
