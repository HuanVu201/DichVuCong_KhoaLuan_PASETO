using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
public sealed class DeleteChildrenGroup : ICommand
{
    public string parentCode { get; set; }
    public bool ForceDelete { get; set; }
}
