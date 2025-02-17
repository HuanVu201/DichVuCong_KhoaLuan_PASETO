using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeNguoiNopHoSo;
public class ThongKeNguoiNopHoSoElementResponse
{
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public int CongDan { get; set; } = 0;
    public int ToChuc { get; set;} = 0;
    public int DoanhNghiep { get; set; } = 0;
    public int TongSo { get; set; } = 0;
}
