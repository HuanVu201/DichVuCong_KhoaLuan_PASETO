using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeNamQuery : IRequest<ThongKeIOCResponse<ThongKeNamElement>>
{
    public int Year { get; set; }
}
public class ThongKeNamElement
{
    public int HoSoDaTiepNhan { get; set; } = 0;
    public int HoSoDaXuLy { get; set; } = 0;
    public int HoSoDaXuLyDungHan { get; set; } = 0;
    public int HoSoDaXuLyQuaHan { get; set; } = 0;
    public double TyLeDaXuLyDungHan { get; set; } = 0;
}