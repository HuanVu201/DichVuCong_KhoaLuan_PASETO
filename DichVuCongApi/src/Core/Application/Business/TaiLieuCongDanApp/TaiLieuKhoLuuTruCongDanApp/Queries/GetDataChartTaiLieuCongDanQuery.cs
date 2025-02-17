using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
public class GetDataChartTaiLieuCongDanQuery : IRequest<Result<GetDataChartTaiLieuCongDanRes>>
{
    public string? Nguon { get; set; }
    public string? MaLinhVuc { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
}

public class GetDataChartTaiLieuCongDanRes
{
    public int DataValue { get; set; } = 0;
    public int ConLai { get; set; } = 0;
}
