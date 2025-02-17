using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchThongTinHoSoGuiVnPost;
public class ThongTinGuiVnPostResponse
{
    public DefaultIdType Id { get; set; }
    public string MaHoSo { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public string? CauHinhBuuDien { get; set; }
    public string? SoDienThoai { get; set; }
}
