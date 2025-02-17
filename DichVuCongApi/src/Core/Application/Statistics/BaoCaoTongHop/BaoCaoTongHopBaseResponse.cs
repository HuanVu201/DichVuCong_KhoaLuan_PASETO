using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoTongHopBaseResponse
{
    public BaoCaoTongHopBaseResponse()
    {
        data = new List<BaoCaoTongHopBaseElementResponse>();
    }
    public BaoCaoTongHopBaseResponse(List<BaoCaoTongHopBaseElementResponse> data)
    {
        this.data = data;
    }

    public List<BaoCaoTongHopBaseElementResponse> data { get; set; }
}
public class BaoCaoTongHopBaseElementResponse
{
    public string MaThongKe { get; set; }
    public string TenThongKe { get; set; }
    public string? MaTTHC { get; set; }
    public string? TenTTHC { get; set; }
    public string? MaDonVi { get; set; }
    public string? TenDonVi { get; set; }
    public int ThuTu { get; set; }
    public string Catalog { get; set; }
    public int TongSo { get; set; } = 0;
    public int TongTiepNhan { get; set; } = 0;
    public int TongDaXuLy { get; set; } = 0;
    public int DaXuLyVaTraLai { get; set; } = 0;
    public int TongDangXuLy { get; set; } = 0;
    public int DangXuLyVaBoSung { get; set; } = 0;
    public int TongBoSung { get; set; } = 0;
    public int TrangThaiBoSung { get; set; } = 0;
    public int TrangThaiDungXuLy { get; set; } = 0;
    public int TrangThaiYeuCauThucHienNVTC { get; set; } = 0;
    public int TongTraLai { get; set; } = 0;
    public int TraLaiQuaHan { get; set; } = 0;
    public int TraLaiDungHan { get; set; } = 0;
    public int TraLaiTruocHan { get; set; } = 0;
    public int TiepNhanKyTruoc { get; set; } = 0;
    public int TiepNhanQuaMang { get; set; } = 0;
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanQuaBCCI { get; set; } = 0;
    public int TiepNhanTrongKy { get; set; } = 0;
    public int TiepNhanTrucTiepVaBCCI { get; set; } = 0;
    public int DaXuLyTruocHan { get; set; } = 0;
    public int DaXuLyDungHan { get; set; } = 0;
    public int DaXuLyDungHanVaTruocHan { get; set; } = 0;
    public int DaXuLyDungHanVaTraLai { get; set; } = 0;
    public int DaXuLyQuaHan { get; set; } = 0;
    public int DangXuLyTrongHan { get; set; } = 0;
    public int DangXuLyTrongHanVaBoSung { get; set; } = 0;
    public int DangXuLyQuaHan { get; set; } = 0;
}
