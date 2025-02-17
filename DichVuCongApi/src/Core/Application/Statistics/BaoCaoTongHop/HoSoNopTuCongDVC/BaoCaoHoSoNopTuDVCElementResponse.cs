using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoNopTuCongDVC;
public class BaoCaoHoSoNopTuDVCElementResponse
{
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public int ThuTu { get; set; }
    public string Catalog { get; set; }
    public int TongTiepNhan { get; set; } = 0;
    public int XuLyDungHan { get; set; } = 0;
    public int TiepNhanQuaHan { get; set; } = 0;
    public int DangXuLyQuaHan { get; set; } = 0;
    public int DangXuLyQuaHanTrongKy { get; set; } = 0;

}
