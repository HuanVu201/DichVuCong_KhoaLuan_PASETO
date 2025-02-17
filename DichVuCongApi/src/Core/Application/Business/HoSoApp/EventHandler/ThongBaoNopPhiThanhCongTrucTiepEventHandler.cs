using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThongBaoNopPhiThanhCongTrucTiepEventHandler : IEventNotificationHandler<ThongBaoNopPhiThanhCongTrucTiepEvent>
{
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IReadRepository<HoSo> _readRepositoryHoSo;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private YeuCauThanhToanConstants _yeuCauThanhToanConstants;

    public ThongBaoNopPhiThanhCongTrucTiepEventHandler(IReadRepository<HoSo> readRepositoryHoSo, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _readRepositoryHoSo = readRepositoryHoSo;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    }

    public async Task Handle(EventNotification<ThongBaoNopPhiThanhCongTrucTiepEvent> notification, CancellationToken cancellationToken)
    {
        DefaultIdType id = notification.Event.HoSoId;

        ThongBaoNopPhiThanhCongTrucTiepEvent Event = notification.Event;
        var idCongDan = Event.SoGiayToNguoiNopTienBienLai;
        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(idCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
            {
                HoSoId = id,
                Content = string.Empty,
                CreatedOn = DateTime.Now,
                Description = string.Empty,
                IsRead = false,
                MaHoSo = Event.MaHoSo,
                Title = "Hồ sơ mã số: " + Event.MaHoSo + " đã thanh toán thành công",
                Topic = idCongDan,
                LoaiThongBao = NotificationLoaiThongBao.CongDan,
                Type = NotificationType.ThanhToanThanhCong
            },id, CancellationToken.None));
        try
        {
            if (!string.IsNullOrEmpty(Event.SoDienThoaiNguoiNopTienBienLai) )
            {
                string hinhThucThanhToan = Event.HinhThucThanhToan == _yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN ? "trực tuyến" : "trực tiếp";
                string loiNhan = $"Ông/bà đã thanh toán {hinhThucThanhToan} thành công cho mã hồ sơ: {Event.MaHoSo}";
                SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                    null,
                    Event.SoDienThoaiNguoiNopTienBienLai,
                    Event.TrichYeuHoSo,
                    Event.NguoiNopTienBienLai,
                    Event.MaHoSo,
                    "Thanh toán thành công",
                    Event.TrichYeuHoSo,
                    loiNhan,
                    HoSoEventUtils.GetLinkBienLaiThuPhi(string.Empty, Event.MaHoSo, Event.SoGiayToChuHoSo),
                    null,
                    "Xem biên lai thu phí");
                ZaloRequest zaloRequest = new ZaloRequest(Event.SoGiayToNguoiNopTienBienLai, loiNhan, Event.MaHoSo);
                _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
            }
        }
        catch (Exception ex)
        {

        }
    }
}

