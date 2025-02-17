using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

public class TuChoiDuThaoCommand : ICommand<DefaultIdType>
{
    //[JsonIgnore]
    public Guid Id { get; set; }

}
