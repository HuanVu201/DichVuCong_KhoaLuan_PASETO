using TD.DichVuCongApi.Shared.Events;

namespace TD.DichVuCongApi.Domain.Common.Contracts;

public abstract class DomainEvent : IEvent
{
    public DateTime TriggeredOn { get; protected set; } = DateTime.Now;
}