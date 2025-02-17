using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Commands;
public class AddThuTucLienQuanCommand : ICommand<Guid>
{
    public Guid ThuTucid { get; set; }
    public Guid ThuTucLienQuanId { get; set; }
    public int ThuTu { get; set; }
}