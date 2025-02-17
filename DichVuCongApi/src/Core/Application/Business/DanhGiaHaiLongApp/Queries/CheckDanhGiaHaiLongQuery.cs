using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
public sealed record CheckDanhGiaHaiLongQuery(DefaultIdType Id) : IQuery<CheckDanhGiahaiLong>;

public class CheckDanhGiahaiLong
{
    public string? MaHoSo { get; set; }
    public string? KenhThucHien { get; set; }
    public bool? DaDanhGia { get; set; }

}
