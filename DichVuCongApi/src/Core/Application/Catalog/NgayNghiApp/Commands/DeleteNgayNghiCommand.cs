using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;
public sealed class DeleteNgayNghiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool ForceDelete { get; set; }
}
