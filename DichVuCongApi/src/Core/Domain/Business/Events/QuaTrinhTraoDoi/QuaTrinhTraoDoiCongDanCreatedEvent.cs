namespace TD.DichVuCongApi.Domain.Business.Events.QuaTrinhTraoDoi;
public class QuaTrinhTraoDoiCongDanCreatedEvent : QuaTrinhTraoDoiEvent
{
    public string NoiDungTraoDoi { get; set; }
    public string TenNguoiXuLy { get; set; }
    public bool? Email { get; set; }
    public bool? SMS { get; set; } 
    public bool? Zalo { get; set; }
    public string? TenDonVi { get; set; }
    public Business.HoSo HoSo { get; set; }
    public string MaHoSo { get; set; }
    public QuaTrinhTraoDoiCongDanCreatedEvent(QuaTrinhTraoDoiCongDan entity, Business.HoSo hoSo, bool? email, bool? sms, bool? zalo, string maHoSo, string noiDungTraoDoi, string tenNguoiXuLy, string? tenDonVi) : base(entity)
    {
        HoSo = hoSo;
        Email = email;
        SMS = sms;
        Zalo = zalo;
        MaHoSo = maHoSo;
        NoiDungTraoDoi = noiDungTraoDoi;
        TenNguoiXuLy = tenNguoiXuLy;
        TenDonVi = tenDonVi;
    }
}
