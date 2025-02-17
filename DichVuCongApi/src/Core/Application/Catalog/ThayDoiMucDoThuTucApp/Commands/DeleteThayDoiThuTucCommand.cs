using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Commands;
public  class DeleteThayDoiThuTucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool ForceDelete { get; set; }
}
