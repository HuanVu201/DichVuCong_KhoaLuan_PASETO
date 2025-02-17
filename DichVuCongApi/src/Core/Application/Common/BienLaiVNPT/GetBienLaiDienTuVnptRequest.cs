using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiVNPT;
public class GetBienLaiDienTuVnptRequest
{
    public string Ma { get; set; }
    public string CauHinhBienLaiThanhToan { get; set; }
    public GetBienLaiDienTuVnptRequest(string ma, string cauHinhBienLaiThanhToan)
    {
        Ma = ma;
        CauHinhBienLaiThanhToan = cauHinhBienLaiThanhToan;
    }
}
