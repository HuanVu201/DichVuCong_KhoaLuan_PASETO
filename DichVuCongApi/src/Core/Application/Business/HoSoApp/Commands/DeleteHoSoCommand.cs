using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public sealed class DeleteHoSoCommand : ICommand
{
    //[JsonIgnore]
    //public DefaultIdType? Id { get; set; }
    public List<string> Ids { get; set; }
    public string? LyDoXoa {get;set;}
    public bool ForceDelete { get; set; }
    public string DeleteSecurityCode { get; set; }
}
