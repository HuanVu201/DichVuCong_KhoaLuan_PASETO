using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
public class AddApiChiaSeCommand : ICommand<Guid>
{
    public string? MaApiChiaSe { get; set; }
    public string? TenApiChiaSe { get; set; }
    public string? NoiDung { get; set; }
    public int? GioiHan { get; set; }
    public string? DuongDan { get; set; }
    public string? NgayGoi { get; set; }
    public int? SoLuotGoiTrongNgay { get; set; }
    public string? ThamSoDauVao { get; set; }
    public string? ThamSoDauRa { get; set; }
    public string? HuongDanGoi { get; set; }
}
