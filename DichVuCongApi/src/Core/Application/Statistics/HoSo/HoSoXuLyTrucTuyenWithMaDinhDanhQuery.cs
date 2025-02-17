using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class HoSoXuLyTrucTuyenWithMaDinhDanhQuery : IQuery<HoSoXuLyTrucTuyenWithMaDinhDanhDto>
{
    public string? MaDinhDanh { get; set; }
    public int? Type { get; set; } = 0;
    public string? TuNgay { get; set; }
    public string? DenNgay { get; set; }
    public double? CacheTime { get; set; } = 60;
}

public class HoSoXuLyTrucTuyenWithMaDinhDanhDto : IDto
{
    public string TyLeXuLyDungHan { get; set; }
    public string TenDonVi { get; set; }
}