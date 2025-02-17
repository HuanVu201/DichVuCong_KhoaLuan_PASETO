using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Dtos;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Queries;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Common.FirebaseNotification;
public interface IFirebaseNotification : ITransientService
{
    Task NotifyAsync(string message, int progress, CancellationToken cancellationToken);
    Task<int> UpdateIsRead(UpdateIsReadNotificationCommand req, CancellationToken cancellationToken = default);
    Task<Guid?> InsertNotification(CreateFirebaseNotificationCommand req, CancellationToken cancellationToken = default);
    Task Handle(string topic, CreateFirebaseNotificationCommand request, Guid? id, CancellationToken cancellationToken);
    Task HandleMultiMessage(List<CreateFirebaseNotificationCommand> request, CancellationToken cancellationToken);
    Task<PaginationResponse<SearchNotificationDto>> SearchNotification(SearchNotificationQuery req, CancellationToken cancellationToken = default);
}
