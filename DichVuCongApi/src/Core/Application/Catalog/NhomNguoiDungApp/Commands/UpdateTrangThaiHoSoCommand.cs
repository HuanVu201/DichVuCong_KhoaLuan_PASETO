using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp.Commands;
public sealed class UpdateNhomNguoiDungCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
}
