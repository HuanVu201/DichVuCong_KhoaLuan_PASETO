using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTheoDonViMucDo34;
public class HoSoTheoDonViMucDo34ElementResponse
{
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public int TongSo { get; set; } = 0;
    public int TongTrucTuyen { get; set; } = 0;
    public int TongTrucTiep { get; set; } = 0;
    public int TongBCCI { get; set; } = 0;
    public int TongToanTrinh { get; set; } = 0;
    public int TongToanTrinhTrucTuyen { get; set; } = 0;
    public int TongToanTrinhTrucTiep { get; set; } = 0;
    public int TongToanTrinhBCCI { get; set; } = 0;
    public int TongMotPhan { get; set; } = 0;
    public int TongMotPhanTrucTuyen { get; set; } = 0;
    public int TongMotPhanTrucTiep { get; set; } = 0;
    public int TongMotPhanBCCI { get; set; } = 0;
    public int TTHCDatChiTieu { get; set; } = 0;
    public int TTHCKhongDatChiTieu { get; set; } = 0;
    public int TTHCKhongPhatSinhHoSo { get; set; } = 0;
    public string? MucDo { get; set; }
}
