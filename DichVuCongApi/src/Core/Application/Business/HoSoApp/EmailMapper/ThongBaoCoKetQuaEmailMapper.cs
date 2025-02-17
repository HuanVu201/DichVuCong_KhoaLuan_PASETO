using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
public class ThongBaoCoKetQuaEmailMapper : HoSo
{
    public string HoTenNguoiNop { get; set; }
    public string TenDonVi { get; set; }
    public string MaHoSo { get; set; }
    public string SoDienThoaiHoTro { get; set; }
}
