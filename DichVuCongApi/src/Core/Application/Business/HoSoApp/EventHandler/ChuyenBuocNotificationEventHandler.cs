using TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ChuyenBuocNotificationEventHandler : IEventNotificationHandler<ChuyenBuocNotificationEvent>
{
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "email_khi_co_ket_qua";

    public ChuyenBuocNotificationEventHandler(IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
    }
    public async Task Handle(EventNotification<ChuyenBuocNotificationEvent> notification, CancellationToken cancellationToken)
    {
        HoSo hoSo = notification.Event.Entity;
        ChuyenBuocNotificationEvent Event = notification.Event;
        string sqlGetNguoiNhanThongBao = $"SELECT UserName from {SchemaNames.Identity}.{TableNames.Users} WHERE '{Event.NguoiNhanThongBao}' Like '%' + Id + '%'";
        string sqlGetYeuCauThanhToan = $"SELECT Top 1 Id from {SchemaNames.Business}.{TableNames.YeuCauThanhToans} WHERE (TrangThai = N'Chưa thanh toán' AND HinhThucThu = N'Thu sau') AND MaHoSo = @MaHoSo";

        var choXacNhanTraKetQua = await _dapperRepository.QueryFirstOrDefaultAsync<YeuCauThanhToan>(sqlGetYeuCauThanhToan, new
        {
            hoSo.MaHoSo
        }, cancellationToken: cancellationToken);
        var users = await _dapperRepository.QueryAsync<UserDetailsDto>(sqlGetNguoiNhanThongBao, cancellationToken: cancellationToken);
        var firebaseNotifications = new List<CreateFirebaseNotificationCommand>();
        for (int i = 0; i < users.Count; i++)
        {
            var user = users[i];
            CreateFirebaseNotificationCommand firebaseNotification = new CreateFirebaseNotificationCommand()
            {
                HoSoId = hoSo.Id,
                Content = Event.NoiDungThongBao,
                CreatedOn = DateTime.Now,
                Description = "",
                IsRead = false,
                MaHoSo = hoSo.MaHoSo,
                Title = "",
                LoaiThongBao = NotificationLoaiThongBao.CanBo,
                Topic = user.UserName,
                Type = Event.LoaiThongBao,
                FullPath = HoSoEventUtils.GetMenuFullPath(hoSo, choXacNhanTraKetQua != null, Event.MaTrangThaiMoi, Event.TrangThaiTraKQ)
            };
            firebaseNotifications.Add(firebaseNotification);
        }
        _jobService.Enqueue<IFirebaseNotification>(x => x.HandleMultiMessage(firebaseNotifications, CancellationToken.None));
        //_jobService.Enqueue<IFirebaseNotification>(x => x.Handle(user.UserName, firebaseNotification, hoSo.Id, CancellationToken.None));
    }
}
