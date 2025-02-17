using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeThangQuery : IRequest<ThongKeIOCResponse<ThongKeThangElement>>
{
    public int Year { get; set; }
}

public class ThongKeThangElement
{
    public int Nam { get; set; } = 0;
    public int Thang { get; set; } = 0;
    public int HoSoDaTiepNhan { get; set; } = 0;
    public int HoSoDaXuLy { get; set; } = 0;
    public int HoSoDaXuLyDungHan { get; set; } = 0;
    public int HoSoDaXuLyQuaHan { get; set; } = 0;
    public int HoSoTiepNhanKyTruoc { get; set; } = 0;
    public int TongHoSoDaTiepNhan { get; set; } = 0;
    public double TyLeDaXuLyDungHan { get; set; } = 0;
}
