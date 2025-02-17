namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ChuyenBuocNotificationEvent : HoSoEvent
{
    public string NguoiNhanThongBao { get; set; }
    public string NoiDungThongBao { get; set; }
    public string LoaiThongBao { get; set; }
    public string MaTrangThaiMoi { get; set; }
    public string TrangThaiTraKQ { get; set; }

    public ChuyenBuocNotificationEvent(Business.HoSoQLVB hoSo, string nguoiNhanThongBao, string noiDungThongBao, string loaiThongBao, string maTrangThaiMoi, string trangThaiTraKQ) : base(hoSo)
    {
        NguoiNhanThongBao = nguoiNhanThongBao;
        NoiDungThongBao = noiDungThongBao;
        LoaiThongBao = loaiThongBao;
        MaTrangThaiMoi = maTrangThaiMoi;
        TrangThaiTraKQ = trangThaiTraKQ;
    }
}
