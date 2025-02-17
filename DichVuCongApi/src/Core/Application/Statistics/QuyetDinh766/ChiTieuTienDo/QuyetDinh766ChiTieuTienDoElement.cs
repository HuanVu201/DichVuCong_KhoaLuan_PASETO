namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTienDo;
public class QuyetDinh766ChiTieuTienDoElement
{

    public string? MaDinhDanh { get; set; }
    public string MaThongKe { get; set; }
    public string MaThongKeCha { get; set; }
    public string? Catalog { get; set; }
    public string TenThongKe { get; set; }
    public int TongSo { get; set; } = 0;
    public int TongTiepNhan { get; set; } = 0;
    public int TongDaXuLy { get; set; } = 0;

    public int TongDangXuLy { get; set; } = 0;
    public int TongTamDungXuLy { get; set; } = 0;

    public int TiepNhanKyTruoc { get; set; } = 0;

    public int TiepNhanQuaMang { get; set; } = 0;
    public int TiepNhanTrucTiep { get; set; } = 0;
    public int TiepNhanBCCI { get; set; } = 0;
    public int DaXuLyDungHan { get; set; } = 0;
    public int DaXuLyQuaHan { get; set; } = 0;
    public int DaXuLyTruocHan { get; set; } = 0;
    public int DangXuLyTrongHanVaBoSung { get; set; } = 0;

    public int DangXuLyVaBoSung { get; set; } = 0;
    public int DangXuLyTrongHan { get; set; } = 0;
    public int DangXuLyQuaHan { get; set; } = 0;

    public int TamDungXuLyTrongHan { get; set; } = 0;
    public int TamDungXuLyQuaHan { get; set; } = 0;
    public int TongTraLai { get; set; } = 0;
    public int TraLaiQuaHan { get; set; } = 0;
    public int TraLaiDungHan { get; set; } = 0;
    public int TraLaiTruocHan { get; set; } = 0;
}
