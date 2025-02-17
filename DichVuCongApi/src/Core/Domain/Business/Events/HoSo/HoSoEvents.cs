namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public abstract class HoSoEvent : DomainEvent
{
    public TD.DichVuCongApi.Domain.Business.HoSo Entity { get; set; }

    protected HoSoEvent(TD.DichVuCongApi.Domain.Business.HoSo hoSo) => Entity = hoSo;
}
