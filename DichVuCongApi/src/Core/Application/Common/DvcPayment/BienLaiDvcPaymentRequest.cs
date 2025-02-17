using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.DvcPayment;
public class BienLaiDvcPaymentRequest
{
    public string LoaiBanTin { get; set; } = "GET_BILL";
    public string PhienBan { get; set; } = "1.0.6";
    public string MaDoiTac { get; set; }
    public string MaThamChieu { get; set; }
    public string ThoiGianGD { get; set; }
    public string MaXacThuc { get; set; }
}
