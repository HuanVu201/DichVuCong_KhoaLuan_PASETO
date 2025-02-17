using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Commands;
public sealed class UpdateBuocXuLyCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string TenBuoc { get; set; }

}
