using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;
public class SoLieuThongKeThuTucTheoDonViRequest : IRequest<Result<SoLieuThongKeTheoDonViElement>>
{
    public string? MaDinhDanh { get; set; }
    public List<string>? Catalogs { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
}
