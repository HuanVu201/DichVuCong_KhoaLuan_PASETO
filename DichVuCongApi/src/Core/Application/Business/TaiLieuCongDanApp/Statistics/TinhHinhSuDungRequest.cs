using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.Statistics;
public class TinhHinhSuDungRequest : IRequest<Result<TinhHinhSuDungTaiLieuResponse>>
{
}

public class TinhHinhSuDungTaiLieuResponse
{
    public int SoLuongSuDung { get; set; } = 0;
    public int SoLuongChuaSuDung { get; set; } = 0;
    public int SoLuongTaiSuDung { get; set; } = 0;
    public int SoLuongChuaTaiSuDung { get; set; } = 0;

}
