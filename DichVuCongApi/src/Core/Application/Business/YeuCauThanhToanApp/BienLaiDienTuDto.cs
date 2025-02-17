using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
public class BienLaiDienTuDto 
{
    public DefaultIdType? IdYeuCauThanhToan { get; set; }
    public string BienLaiDienTu { get; set; }
    public string MaLoi { get; set; }
    public string MauSoBienLai { get; set; }
    public string KyHieuBienLai { get; set; }
    public string SoBienLai { get; set; }
    public string LoaiBienLaiThanhToan { get; set; }
}
