using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiNhieuHoSoQuaHanCommand : ICommand<Dictionary<string, string>>
{
    public List<Guid> Ids { get; set; }
    public DateTime? NgayHenTra { get; set; }
}
