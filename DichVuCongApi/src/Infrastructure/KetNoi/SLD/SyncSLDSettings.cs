using TD.DichVuCongApi.Application.Common.KetNoi.Classes;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.SLD;
public class SyncSLDSettings
{
    public string AcceptKey { get; set; }
    public string LoaiDuLieu { get; set; }
    public string MaTinh { get; set; }
    public string MaHuyen { get; set; }
    public string MaXa { get; set; }
    public string URLEndPoint { get; set; }
    public bool EnablePull { get; set; }
    public bool EnablePush { get; set; }
    public string DongBoLenHoSoTuNgay { get; set; }
    public Dictionary<string, string> DanhSachThuTucDongBoDVC { get; set; }
    public bool EnableUpdateWhenExist { get; set; }
    public string UrlPushData { get; set; }
    public BaseTokenSettings? Token { get; set; }
}
