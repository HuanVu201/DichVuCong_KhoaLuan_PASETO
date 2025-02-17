using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;

namespace TD.DichVuCongApi.Application.Statistics.TongHopDonVi;
public class TongHopDonViRequest : BaseStatistisRequestModel, IRequest<BaoCaoTongHopBaseResponse>
{
    public string? MaDonViCha { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? Catalog { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? Type { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? KenhThucHien { get; set; }
    public string? MucDo { get; set; }
    public string? LinhVucId { get; set; }
    public bool LaDuLieuThongKeCacNam { get; set; } = false;
}
