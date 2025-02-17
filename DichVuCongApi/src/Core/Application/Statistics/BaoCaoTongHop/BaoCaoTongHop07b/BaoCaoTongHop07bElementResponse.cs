using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop07b;
public class BaoCaoTongHop07bElementResponse
{
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public string? Catalog { get; set; }
    public int TongSoTTHC { get; set; } = 0;
    public int SoTTHCCapTinh { get; set; } = 0;
    public int SoTTHCCapHuyen { get; set; } = 0;
    public int SoTTHCCapXa { get; set; } = 0;
    public int TongSoTTHCTheoCCMC { get; set; } = 0;
    public int SoTTHCTaiBPMCCapTinh { get; set; } = 0;
    public int SoTTHCTaiBPMCCapHuyen { get; set; } = 0;
    public int SoTTHCTaiBPMCCapXa { get; set; } = 0;
    public int TongSoQuyTrinh { get; set; } = 0;
    public int SoQuyTrinhCapTinh { get; set; } = 0;
    public int SoQuyTrinhCapHuyen { get; set; } = 0;
    public int SoQuyTrinhCapXa { get; set; } = 0;
}
