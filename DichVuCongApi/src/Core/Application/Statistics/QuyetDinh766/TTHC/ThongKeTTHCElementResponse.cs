using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.TTHC;
public class ThongKeTTHCElementResponse
{
    public string MaDonVi {  get; set; }
    public string TenDonVi { get; set; }
    public string Catalog { get; set; }
    public string MalinhVuc { get; set; }
    public string TenLinhVuc { get; set; }
    public int TongTTHC { get; set; } = 0;
    public int TTHCTrucTuyenToanTrinh { get; set; } = 0;
    public int TTHCTrucTuyenMotPhan { get; set; } = 0;
    public int TTHCConLai { get;set; }= 0;
    public int TongTTHCThuPhi { get; set; } = 0;
    public int TTHCThuPhiTrucTuyenToanTrinh { get; set; } = 0;
    public int TTHCThuPhiTrucTuyenMotPhan { get; set; } = 0;
    public int TTHCThuPhiConLai { get; set; } = 0;  
}
