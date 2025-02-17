using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
public class GuiPhieuTiepNhanEmailMapper : HoSo
{
    public string HoTenChuHoSo { get; set; }
    public string TenTinhThanh { get; set; }
    public string MaHoSo { get; set; }
    public string FileDinhKem { get; set; }
    public string TenNguoiNhanHoSo { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string TenDonVi { get; set; }
}
