using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class HoSoXuLyQuery : IQuery<HoSoXuLyDto>
{
    public string? TuNgay { get; set; }
    public string? DenNgay { get; set; }
    public double? CacheTime { get; set; } = 60;
}

public class HoSoXuLyDto : IDto
{
    public int DaHoanThanhDungHan { get; set; }
    public int DaHoanThanhQuaHan { get; set; }
    public int DaTiepNhan { get; set; }
    public int DaGiaiQuyet { get; set; }
    public int DangXuLy { get; set; }
    public int TiepNhanTrucTiep { get; set; }
    public int TiepNhanQuaBCCI { get; set; }
    public int TiepNhanQuaMang { get; set; }
}