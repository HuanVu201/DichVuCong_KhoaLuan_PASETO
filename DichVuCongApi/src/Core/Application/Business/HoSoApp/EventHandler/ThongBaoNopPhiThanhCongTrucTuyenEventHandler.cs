using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThongBaoNopPhiThanhCongTrucTuyenEventHandler : IEventNotificationHandler<ThongBaoNopPhiThanhCongTrucTuyenEvent>
{
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IReadRepository<HoSo> _readRepositoryHoSo;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "";

    public ThongBaoNopPhiThanhCongTrucTuyenEventHandler(IReadRepository<HoSo> readRepositoryHoSo, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _readRepositoryHoSo = readRepositoryHoSo;
    }
    public async Task Handle(EventNotification<ThongBaoNopPhiThanhCongTrucTuyenEvent> notification, CancellationToken cancellationToken)
    {
        string hoSoId = notification.Event.HoSoId;
        ThongBaoNopPhiThanhCongTrucTuyenEvent Event = notification.Event;
        var hoSo = await _readRepositoryHoSo.GetByIdAsync(hoSoId);
        var idCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
        if (hoSo != null)
        {
            _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(idCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
            {
                HoSoId = hoSo.Id,
                Content = "",
                CreatedOn = DateTime.Now,
                Description = "",
                IsRead = false,
                MaHoSo = hoSo.MaHoSo,
                Title = "Hồ sơ mã số: " + hoSo.MaHoSo + " đã thanh toán thành công",
                Topic = idCongDan,
                LoaiThongBao = NotificationLoaiThongBao.CongDan,
                Type = NotificationType.ThanhToanThanhCong
            }, hoSo.Id, CancellationToken.None));
            var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
            {
                MaHoSo = hoSo.MaHoSo
            });
            _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(dataSdtNguoiTiepNhan.UserName, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
            {
                HoSoId = hoSo.Id,
                Content = "",
                CreatedOn = DateTime.Now,
                Description = "",
                IsRead = false,
                MaHoSo = hoSo.MaHoSo,
                Title = "Hồ sơ mã số: " + hoSo.MaHoSo + " đã thanh toán thành công",
                Topic = dataSdtNguoiTiepNhan.UserName,
                LoaiThongBao = NotificationLoaiThongBao.CanBo,
                Type = NotificationType.ThanhToanThanhCong,
                FullPath = HoSoEventUtils.DaThuPhiFullPath
            }, hoSo.Id, CancellationToken.None));

            if (hoSo.ThongBaoZalo == true)
            {
                try
                {
                    if ((!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
                    {

                        string loiNhan = $"Ông/bà đã thanh toán thành công cho mã hồ sơ: {hoSo.MaHoSo}";
                        SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                            null,
                            hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                            hoSo.TrichYeuHoSo,
                            hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                            hoSo.MaHoSo,
                            "Thanh toán thành công",
                            hoSo.TrichYeuHoSo,
                            loiNhan,
                            HoSoEventUtils.GetLinkBienLaiThuPhi("", hoSo.MaHoSo,hoSo.SoGiayToChuHoSo),
                            null,
                            "Xem biên lai thu phí");
                        ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
                        _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
                    }
                }
                catch (Exception ex)
                {

                }
            }
        }
    }
}
