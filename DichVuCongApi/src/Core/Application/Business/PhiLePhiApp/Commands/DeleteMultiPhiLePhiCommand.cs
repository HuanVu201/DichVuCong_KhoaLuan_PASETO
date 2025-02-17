using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;
public class DeleteMultiPhiLePhiCommand : ICommand
{
    public List<string> Ids { get; set; }

}
