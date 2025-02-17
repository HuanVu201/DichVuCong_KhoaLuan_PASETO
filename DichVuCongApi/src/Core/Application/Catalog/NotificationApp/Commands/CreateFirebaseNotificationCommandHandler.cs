using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
public class CreateFirebaseNotificationCommandHandler : ICommandHandler<CreateFirebaseNotificationCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IFirebaseNotification _firebaseNotification;
    private readonly ICurrentUser _currentUser;
    public CreateFirebaseNotificationCommandHandler(ICurrentUser currentUser, IDapperRepository dapperRepository, IFirebaseNotification firebaseNotification)
    {
        _dapperRepository = dapperRepository;
        _firebaseNotification = firebaseNotification;
        _currentUser = currentUser;
    }
    public async Task<Result> Handle(CreateFirebaseNotificationCommand request, CancellationToken cancellationToken)
    {
        var userName = _currentUser.GetUserName();
        try
        {
            await _firebaseNotification.Handle(userName, request, request.HoSoId, cancellationToken);
            return (Result)Result.Success();
        } catch (Exception ex)
        {
            return (Result)Result.Fail("Thêm mới thông báo thất bại");

        }
    }
}
