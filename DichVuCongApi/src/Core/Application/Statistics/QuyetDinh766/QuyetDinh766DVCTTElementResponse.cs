using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class QuyetDinh766DVCTTElementResponse
{
    public string MaThongKe { get; set; }
    public string? Catalog { get; set; }
    public string? MaDinhDanh { get; set; }
    public string TenThongKe { get; set; }
    public int TongTiepNhan { get; set; } = 0;
    public int TiepNhanQuaMang { get; set; } = 0;
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanBCCI { get; set; } = 0;
    public int TongTrucTuyenDangXuLy { get; set; } = 0;
    public int TrucTuyenDangXuLyTrongHan { get; set; } = 0;
    public int TrucTuyenDangXuLyQuaHan { get; set; } = 0;
    public int TongCoNghiaVuTaiChinh { get; set; } = 0;
    public int DaTTTTQuaDvcqg { get; set; } = 0;
    public int TongDaDongBoVeDvcqg { get; set; } = 0;
}
