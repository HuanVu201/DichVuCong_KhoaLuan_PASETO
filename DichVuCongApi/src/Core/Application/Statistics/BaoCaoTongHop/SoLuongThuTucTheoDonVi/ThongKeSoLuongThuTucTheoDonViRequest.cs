using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.SoLuongThuTucTheoDonVi;
public class ThongKeSoLuongThuTucTheoDonViRequest : IRequest<BaoCaoSo06Response<ThongKeSoLuongThuTucTheoDonViResponse>>
{
    public string? Catalog { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? MaDinhDanh { get; set; }
}
