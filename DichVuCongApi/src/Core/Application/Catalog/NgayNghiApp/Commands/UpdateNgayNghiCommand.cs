using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;
public sealed class UpdateNgayNghiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string Description { get; set; }
    public DateTimeOffset Date { get; set; }
}
