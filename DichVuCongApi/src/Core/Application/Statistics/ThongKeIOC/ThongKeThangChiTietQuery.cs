using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeThangChiTietQuery : IRequest<ThongKeIOCResponse<ThongKeThangChiTietElement>>
{
    public int Month { get; set; }
    public int Year { get; set; }
}

public class ThongKeThangChiTietElement
{
    public int HSBoSung { get; set; } = 0;
    public int HSDaXLDungHan { get; set; } = 0;
    public int HSDaXLQuaHan { get; set; } = 0;
    public int HSDaXuLyTong { get; set; } = 0;
    public int HSDangXLQuaHan { get; set; } = 0;
    public int HSDangXLTrongHan { get; set; } = 0;
    public int HSDangXuLyTong { get; set; } = 0;
    public int HSTrucTiepVaBCCI { get; set; } = 0;
    public int HSTiepNhan { get; set; } = 0;
    public int HSTiepNhanKyTruoc { get; set; } = 0;
    public int HSTiepNhanTrucTuyen { get; set; } = 0;
    public int HSTiepNhanTong { get; set; } = 0;
    public int HSTraLai { get; set; } = 0;
    public string MaDonVi { get; set; } = string.Empty;
    public string TenDonVi { get; set; } = string.Empty;
}
