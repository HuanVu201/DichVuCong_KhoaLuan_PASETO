using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class DuLieuThongKeTheoThangQuery : ICommand<List<DuLieuThongKeTheoThangDto>>
{
    public bool? Cache { get; set; } = true;
    public double? CacheTime { get; set; } = 10;

    [Newtonsoft.Json.JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 12;
    public new int PageNumber { get; set; } = 1;
    public DateTime TuNgay { get; set; }
    public DateTime DenNgay { get; set; }
    public int Year { get; set; } = DateTime.Now.Year;
    public bool? LaDuLieuThongKeCacNam = true;
}

public class DuLieuThongKeTheoThangDto : IDto
{
    public int TongSoHoSo { get; set; } = 0;
    public int HoSoTuKyTruoc { get; set; } = 0;
    public int HoSoMoiTiepNhan { get; set; } = 0;
    public int TongSoHoSoDaXuLy { get; set; } = 0;
    public int HoSoDaXuLyDungHan { get; set; } = 0;
    public int TongSoHoSoDaXuLyTrongKy { get; set; } = 0;
    public int HoSoDaXuLyQuaHan { get; set; } = 0;
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanQuaBCCI { get; set; } = 0;
    public int TiepNhanQuaMang { get; set; } = 0;
    public int DangXuLy { get; set; } = 0;
    public int Thang { get; set; }
    public int Nam { get; set; }

    [System.Text.Json.Serialization.JsonIgnore]
    public int TotalCount { get; set; }
}