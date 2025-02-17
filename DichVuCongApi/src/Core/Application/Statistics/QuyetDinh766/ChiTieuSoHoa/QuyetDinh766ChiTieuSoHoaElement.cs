using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuSoHoa;
public class QuyetDinh766ChiTieuSoHoaElement
{
    public string Catalog { get; set; }
    public string MaThongKe { get; set; }
    public string MaThongKeCha { get; set; }
    public string TenThongKe { get; set; }
    public string MaDinhDanh { get; set; }
    public int TiepNhan { get; set; } = 0;
    public int ChuaSoHoaTPHS { get; set; } = 0;
    public int CoSoHoaTPHS { get; set;} = 0;
    public int CoTaiSuDungTPHS { get; set; } = 0;
    public int CoTaiSuDungTPHSTuDvcQg { get; set; } = 0;
    public int DaGiaiQuyet { get; set; } = 0;
    public int DaGiaiQuyetChuaSoHoa { get; set; } = 0;
    public int DaGiaiQuyetDaSoHoa { get; set; } = 0;
}
