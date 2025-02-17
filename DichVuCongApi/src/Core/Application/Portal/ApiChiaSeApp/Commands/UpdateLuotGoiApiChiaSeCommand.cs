using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
public class UpdateLuotGoiApiChiaSeCommand : ICommand
{
    public string? MaApiChiaSe { get; set; }
}

