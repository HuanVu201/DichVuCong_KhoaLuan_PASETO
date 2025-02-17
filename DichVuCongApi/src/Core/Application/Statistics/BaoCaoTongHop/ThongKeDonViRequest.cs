using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeDonVi;
public class ThongKeDonViRequest : BaseStatistisRequestModel, IRequest<ThongKeDonViBaseResponse>
{
    public string MaDinhDanh { get; set; }
}
public class ThongKeDonViBaseResponse
{
    public ThongKeDonViBaseResponse()
    {
        data = new List<ThongKeDonViBaseElementResponse>();
    }
    public ThongKeDonViBaseResponse(List<ThongKeDonViBaseElementResponse> data)
    {
        this.data = data;
    }

    public List<ThongKeDonViBaseElementResponse> data { get; set; }
}
public class ThongKeDonViBaseElementResponse
{
    public string? MaDonVi { get; set; }
    public string? TenDonVi { get; set; }

    public int TongSoTiepNhan { get; set; } = 0;
    public int TiepNhanKyTruoc { get; set; } = 0;
    public int TiepNhanTrongKy { get; set; } = 0;

    public int DaXuLy { get; set; } = 0;
    public int DaXuLyDungHan { get; set; } = 0;
    public int DaXuLyQuaHan { get; set; } = 0;

    public int DangXuLy { get; set; } = 0;
    public int DangXuLyQuaHan { get; set; } = 0;
    public int DangXuLyTrongHan { get; set; } = 0;

    public int TraLai { get; set; } = 0;
    public int BoSung { get; set; } = 0;
}
