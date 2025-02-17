using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC.Dto;
public class ThongKeHoSoTheoNgayDto
{
    public int TiepNhan { get; set; } = 0;
    public int DaXuLyDungHan { get; set; } = 0;
    public int DaXuLyQuaHan { get; set; } = 0;
}
