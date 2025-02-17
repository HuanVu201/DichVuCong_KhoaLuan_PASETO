using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThuTuc;
public class TongHopThuTucPhatSinhHoSoElementResponse
{
    public string MaTTHC { get; set; }
    public string TenTTHC { get; set; }
    public string TenDonVi { get; set; }
    public string MaDonVi { get; set; }
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanTrucTuyen { get; set; } = 0;
    public int TiepNhanBCCI { get; set; } = 0;
    public int TraKetQuaQuaBCCI { get; set; } = 0;
    public int TongTiepNhan { get; set; } = 0;
}
