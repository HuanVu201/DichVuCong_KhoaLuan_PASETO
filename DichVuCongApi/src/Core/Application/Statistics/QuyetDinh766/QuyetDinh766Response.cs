namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class QuyetDinh766Response<T> where T : class
{
    public QuyetDinh766Response(List<T> result)
    {
        this.data = result;
    }

    public List<T> data { get; set; }
}
public class QuyetDinh766ElementResponse
{
    public string? MaDinhDanh { get;set; }
    public string MaThongKe { get; set; }
    public string? Catalog { get; set; }
    public string TenThongKe { get; set; }
    public int TongSo { get; set; } = 0;
    public int TongTiepNhan { get; set; } = 0;
    public int TongDaXuLy { get; set; } = 0;
    public int TongDaXuLyTrucTuyen { get; set; } = 0;
    public int TongDangXuLy { get; set; } = 0;
    public int TongPhaiDongBoDvcqg { get; set; } = 0;
    public int TongDaDongBoDvcqg { get; set; } = 0;
    public int TongCoNghiaVuTaiChinh { get; set; } = 0;
    public int TiepNhanKyTruoc { get; set; } = 0;
    public int TiepNhanQuaMang { get; set; } = 0;
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanBCCI { get; set; } = 0;
    public int DaXuLyDungHan { get; set; } = 0;
    public int DaXuLyQuaHan { get; set; } = 0;

    public int DaXuLyTrucTuyen { get; set;} = 0;
    public int DaXuLyTrucTuyenDungHan { get; set;} = 0;
    public int DaXuLyTrucTuyenQuaHan { get; set; } = 0;
    public int DangXuLyTrongHan { get; set; } = 0;
    public int DangXuLyQuaHan { get; set; } = 0;
    public int DaTTTTQuaDvcqg { get; set; } = 0;

}