using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;
public class DuyetThongQuaDuThaoCommand : ICommand<DefaultIdType>
{
    //[JsonIgnore]
    public Guid Id { get; set; }
    
}
