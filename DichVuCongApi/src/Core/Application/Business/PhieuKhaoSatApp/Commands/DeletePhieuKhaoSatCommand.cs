using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;



namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;
public class DeletePhieuKhaoSatCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool ForceDelete { get; set; }
}
