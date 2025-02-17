using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;
public sealed class DeleteLoaiThuTucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool ForceDelete { get; set; }
}
