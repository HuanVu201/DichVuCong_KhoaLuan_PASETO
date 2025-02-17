using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeTheoTruongHop;
public class ThongKeTheoTruongHopResponse
{
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public int TongSo { get; set; } = 0;
    public int TiepNhanQuaMang { get; set; } = 0;
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanQuaBCCI { get; set; } = 0;
}
