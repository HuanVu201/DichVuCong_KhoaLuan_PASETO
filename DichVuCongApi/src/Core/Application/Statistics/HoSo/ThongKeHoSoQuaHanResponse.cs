using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class ThongKeHoSoQuaHanResponse
{
    public ThongKeHoSoQuaHanResponse(List<ThongKeHoSoQuaHanElementResponse> data)
    {
        Data = data;
    }

    public List<ThongKeHoSoQuaHanElementResponse> Data { get; set; }
}
public class ThongKeHoSoQuaHanElementResponse
{
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public string MaDinhDanh { get; set; }
    public string Catalog { get; set; }
    public int TongSo { get; set; } = 0;
}
