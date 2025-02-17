using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeNguoiNopHoSo;
public class ThongKeNguoiNopHoSoRequest : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<ThongKeNguoiNopHoSoElementResponse>>
{
    public string? MaDonViCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
}
