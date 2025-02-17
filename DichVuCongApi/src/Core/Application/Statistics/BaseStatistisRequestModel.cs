using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics;
public class BaseStatistisRequestModel : PaginationFilter
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? MaDonViCha { get; set; }
    public string? Catalog { get; set; }
    public bool LaDuLieuThongKeCacNam { get; set; } = false;
    public bool? cache { get; set; } = true;
}
