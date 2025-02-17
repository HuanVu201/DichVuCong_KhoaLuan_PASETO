using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public sealed class DeleteQuyTrinhXuLyCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool ForceDelete { get; set; }
}
