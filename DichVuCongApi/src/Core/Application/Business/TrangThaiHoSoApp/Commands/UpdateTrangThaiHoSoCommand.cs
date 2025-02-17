using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Commands;
public sealed class UpdateTrangThaiHoSoCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
    public bool? LaTrangThaiQuyTrinh { get; set; } = false;
}
