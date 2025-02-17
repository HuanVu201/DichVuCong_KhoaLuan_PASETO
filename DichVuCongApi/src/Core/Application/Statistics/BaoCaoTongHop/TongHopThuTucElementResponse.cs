using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class TongHopThuTucElementResponse : BaoCaoTongHopBaseElementResponse
{
    public string? MaDonVi { get; set; }
    public string? TenDonVi { get; set; }
    public string? LinhVucChinh { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public bool? CoPhatSinhHoSo { get; set; }
    public string MucDo { get; set; }
}
