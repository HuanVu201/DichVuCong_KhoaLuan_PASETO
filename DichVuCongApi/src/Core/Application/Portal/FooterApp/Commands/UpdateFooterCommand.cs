using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Commands;
public sealed class UpdateFooterCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TieuDe { get; set; }
    public string? ImageUrl { get; set; }
    public string? NoiDung { get; set; }
}
