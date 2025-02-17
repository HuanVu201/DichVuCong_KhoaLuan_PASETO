namespace TD.DichVuCongApi.Domain.Business.Events.QuaTrinhTraoDoi;
public abstract class QuaTrinhTraoDoiEvent : DomainEvent
{
    public QuaTrinhTraoDoiCongDan Entity { get; set; }
    protected QuaTrinhTraoDoiEvent(QuaTrinhTraoDoiCongDan entity)
    {
        Entity = entity;
    }
}
