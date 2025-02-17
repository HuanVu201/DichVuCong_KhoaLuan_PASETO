using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.Statistics;
public class DungLuongTheoNguonTaiLenRequest : IRequest<Result<DungLuongTheoNguonTaiLenResponse>>
{
    public string? SoDinhDanh { get; set; }
    public string? FullName { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
}

public class DungLuongTheoNguonTaiLenResponse
{
    public double CongDanTaiLen { get; set; } = 0;
    public double ThanhPhanHoSo { get; set; } = 0;
    public double KetQuaGiaiQuyet { get; set; } = 0;
    public double DichVuCongQG { get; set; } = 0;

}
