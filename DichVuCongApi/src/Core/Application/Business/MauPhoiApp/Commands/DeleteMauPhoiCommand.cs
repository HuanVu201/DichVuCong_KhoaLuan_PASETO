using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
public sealed class DeleteMauPhoiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool ForceDelete { get; set; }
}