using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries.ThuTucNhieuDonViSuDung;
public class ThuTucNhieuDonViSuDungParams
{
    public string? TuNgay { get; set; }
    public string? DenNgay { get; set; }
    public string? TrangThaiHoSo { get; set; }
    public string? GroupName { get; set; }
    public int TongDVC { get; set; } = 0;
    public int TongDVCMotPhan { get; set; } = 0;
    public int TongDVCToanTrinh { get; set; } = 0;
}
