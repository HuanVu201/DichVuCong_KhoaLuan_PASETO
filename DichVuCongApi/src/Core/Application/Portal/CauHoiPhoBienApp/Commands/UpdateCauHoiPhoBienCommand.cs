using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
public sealed class UpdateCauHoiPhoBienCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TieuDe { get; set; }
    public string? NoiDungCauHoi { get; set; }
    public string? NoiDungTraLoi { get; set; }
    public string? Type { get; set; }
}
