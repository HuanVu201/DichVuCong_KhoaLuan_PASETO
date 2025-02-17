using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoHienTaiJob;
public class SoLieuThongKeHienTaiTheoDonViRequest : BaseStatistisRequestModel, IRequest<Result<SoLieuThongKeHienTaiTheoDonViElement>>
{
    public List<string>? Catalogs { get; set; }
}

public class SoLieuThongKeHienTaiTheoDonViElement
{
    public int ThuTuc { get; set; } = 0;
    public int ThuTucCungCapThongTin { get; set; } = 0;
    public int ThuTucMotPhan { get; set; } = 0;
    public int ThuTucToanTrinh { get; set; } = 0;
    public int DangXuLy { get; set; } = 0;
    public int DangXuLyDungHan { get; set; } = 0;
    public int DangXuLyQuaHan { get; set; } = 0;
    public int BoSung { get; set; } = 0;
    public int ThucHienNghiaVuTaiChinh { get; set; } = 0;
    public int DungXuLy { get; set; } = 0;
    public int GiaoDichChoThanhToan { get; set; } = 0;
}