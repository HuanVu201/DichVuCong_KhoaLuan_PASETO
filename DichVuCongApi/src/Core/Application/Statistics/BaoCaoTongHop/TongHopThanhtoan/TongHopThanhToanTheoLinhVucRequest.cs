using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeNguoiNopHoSo;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThanhtoan;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeThanhToan;
public class TongHopThanhToanTheoLinhVucRequest : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<TongHopThanhToanElementResponse>>
{
    public string? MaDonViCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? Catalog { get; set; }
    public bool? DaThuPhi { get; set; }
    public DateTime? TiepNhanTuNgay { get; set; }
    public DateTime? TiepNhanDenNgay { get; set; }
    public DateTime? ThanhToanTuNgay { get; set; }
    public DateTime? ThanhToanDenNgay { get; set; }
}
