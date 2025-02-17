using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopHoSoTheoTrangThai;
public class TongHopHoSoTheoTrangThaiRequest : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<TongHopHoSoTheoTrangThaiResponse>>
{
    public List<string>? LoaiDuLieuKetNois { get; set; }
}