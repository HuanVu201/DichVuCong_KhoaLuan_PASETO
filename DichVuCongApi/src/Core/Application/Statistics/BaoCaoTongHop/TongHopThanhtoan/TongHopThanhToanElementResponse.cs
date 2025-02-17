using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThanhtoan;
public class TongHopThanhToanElementResponse
{
    public string? Catalog { get; set; }
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public int Phi { get; set; } = 0;
    public int LePhi { get; set; } = 0;
    public int TongSo { get; set; } = 0;
    public int TongTienMat { get; set; } = 0;
    public int TongTrucTuyen { get; set; } = 0;
    public int TongHinhThucThanhToanKhac { get; set; } = 0;
    public int HoSoDaThuPhi { get; set; } = 0;
}
