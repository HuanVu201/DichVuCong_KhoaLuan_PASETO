using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public  class DuplicateQuyTrinhXuLy : ICommand
{
    public DefaultIdType Id { get; set; }
    public string MaTruongHop { get; set; }
}
