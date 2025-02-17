using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
public class AddDiaBanCommand : ICommand<Guid>
{
    public string TenDiaBan { get; set; }
    public string MaDiaBan { get; set; }
    public string? MaTinh { get; set; }
    public string? MaHuyen { get; set; }
    public string? MaXa { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool Active { get; set; } = true;
}
