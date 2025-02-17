using TD.DichVuCongApi.Shared.Events;

namespace TD.DichVuCongApi.Application.Common.Events;

public interface IEventPublisher : ITransientService
{
    Task PublishAsync(IEvent @event);
}