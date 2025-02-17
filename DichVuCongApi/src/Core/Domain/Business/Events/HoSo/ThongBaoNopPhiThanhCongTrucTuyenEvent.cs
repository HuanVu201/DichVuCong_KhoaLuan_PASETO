namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThongBaoNopPhiThanhCongTrucTuyenEvent : HoSoEvent
{
    public string HoSoId { get; set; }
    public ThongBaoNopPhiThanhCongTrucTuyenEvent(Business.HoSo hoSo, string hoSoId) : base(hoSo)
    {
        HoSoId = hoSoId;
    }
}
