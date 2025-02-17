using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
public class UpdateIsReadNotificationCommandHandler : ICommandHandler<UpdateIsReadNotificationCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IFirebaseNotification _firebaseNotification;
    public UpdateIsReadNotificationCommandHandler(IDapperRepository dapperRepository, IFirebaseNotification firebaseNotification)
    {
        _dapperRepository = dapperRepository;
        _firebaseNotification = firebaseNotification;
    }
    public async Task<Result> Handle(UpdateIsReadNotificationCommand request, CancellationToken cancellationToken)
    {
        //string sql = $"UPDATE {SchemaNames.Catalog}.{TableNames.Notifications} SET IsRead = 1 WHERE HoSoId = @HoSoId";
        //var res = await _dapperRepository.ExcuteAsync(sql, cancellationToken);
        var res = await _firebaseNotification.UpdateIsRead(request, cancellationToken);
        if(res != null && res != default)
        {
            return (Result)Result.Success();
        }
        return (Result)Result.Fail("Cập nhật trạng thái thất bại");
    }
}
