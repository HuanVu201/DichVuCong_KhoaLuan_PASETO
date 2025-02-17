using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class DeleteMultiThanhPhanThuTucCommand : ICommand
{
    public List<string> Ids { get; set; }

}
