using TD.DichVuCongApi.Shared.Events;

namespace TD.DichVuCongApi.Application.Common.Events;

public class EventNotification<TEvent> : INotification
    where TEvent : IEvent
{
    public EventNotification(TEvent @event) => Event = @event;

    public TEvent Event { get; }
}