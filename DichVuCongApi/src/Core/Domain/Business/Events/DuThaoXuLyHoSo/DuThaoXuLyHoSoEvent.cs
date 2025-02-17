namespace TD.DichVuCongApi.Domain.Business.Events.DuThaoXuLyHoSo;
public abstract class DuThaoXuLyHoSoEvent : DomainEvent
{
    public TD.DichVuCongApi.Domain.Business.DuThaoXuLyHoSo Entity { get; set; }

    protected DuThaoXuLyHoSoEvent(TD.DichVuCongApi.Domain.Business.DuThaoXuLyHoSo duThaoXuLyHoSo) => Entity = duThaoXuLyHoSo;
}