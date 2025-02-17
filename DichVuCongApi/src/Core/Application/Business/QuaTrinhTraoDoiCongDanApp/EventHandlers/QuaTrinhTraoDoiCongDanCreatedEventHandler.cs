using Mapster;
using MapsterMapper;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
using TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.QuaTrinhTraoDoi;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Common.Events;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.EventHandlers;
public class QuaTrinhTraoDoiCongDanCreatedEventHandler : IEventNotificationHandler<QuaTrinhTraoDoiCongDanCreatedEvent>
{
    private readonly ILogger<QuaTrinhTraoDoiCongDanCreatedEventHandler> _logger;
    private readonly IJobService _jobService;
    private readonly ISMSService _sMSService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private const string mailConfigCode = "qua_trinh_trao_doi_cong_dan_email";
    public QuaTrinhTraoDoiCongDanCreatedEventHandler(ISMSService sMSService, ILogger<QuaTrinhTraoDoiCongDanCreatedEventHandler> logger, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _logger = logger;
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _sMSService = sMSService;
    }
    public async Task Handle(EventNotification<QuaTrinhTraoDoiCongDanCreatedEvent> notification, CancellationToken cancellationToken)
    {
        var quaTrinhTraoDoiCongDan = notification.Event.Entity;
        var hoSo = notification.Event.HoSo;
        var sendEmail = notification.Event.Email;
        var sendZalo = notification.Event.Zalo;
        var sendSms = notification.Event.SMS;
        var noiDungTraoDoi = notification.Event.NoiDungTraoDoi;
        var maHoSo = notification.Event.MaHoSo;
        QuaTrinhTraoDoiCongDanCreatedEvent Event = notification.Event;
        var soDienThoai = hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo;
        var email = hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo;
        if (sendEmail == true && !string.IsNullOrEmpty(email))
        {
            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
            if (config != null)
            {
                Mapper mapper = new Mapper();
                mapper.Config.Default.MapToConstructor(true);
                QuaTrinhTraoDoiCongDanCreatedEmailMapper qttdEmailMapper = mapper.Map<QuaTrinhTraoDoiCongDanCreatedEmailMapper>(hoSo);
                qttdEmailMapper.TenNguoiXuLy = Event.TenNguoiXuLy;
                qttdEmailMapper.NoiDungTraoDoi = Event.NoiDungTraoDoi;
                qttdEmailMapper.HoVaTen = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
                qttdEmailMapper.TenDonVi = Event.TenDonVi;
                qttdEmailMapper.TenNguoiXuLy = Event.TenNguoiXuLy;
                qttdEmailMapper.TrichYeuHoSo = hoSo.TrichYeuHoSo;
                qttdEmailMapper.MaHoSo = Event.MaHoSo;
                var formattedContent = _mailService.FormatContentWithEntity(qttdEmailMapper, config.Content);

                MailRequest mailRequest = new MailRequest(new List<string>() { email }, hoSo.TrichYeuHoSo, maHoSo, formattedContent);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
            }
        }
        if (sendSms == true && !string.IsNullOrEmpty(soDienThoai))
        {
            //SMSRequest sMSRequest = new SMSRequest(soDienThoai, noiDungTraoDoi, maHoSo, hoSo.DonViId);
            //await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.YeuCauBoSung), hoSo, cancellationToken);
            //_jobService.Enqueue<ISMSService>(x => x.SendAsync(sMSRequest, cancellationToken));
        }
        if (sendZalo == true && !string.IsNullOrEmpty(soDienThoai))
        {
            SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(null, soDienThoai, hoSo.TrichYeuHoSo, hoSo.ChuHoSo,
            maHoSo, $"Quá trình trao đổi thông tin Mã hồ sơ: {maHoSo}", hoSo.TrichYeuHoSo, noiDungTraoDoi, "", "", "");
            //_jobService.Enqueue<IZaloService>(x => x.SendTemplateAsync(sendTemplateZalo, cancellationToken));
            ZaloRequest zaloRequest = new ZaloRequest(soDienThoai, noiDungTraoDoi, maHoSo);
            _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
        }
    }
}
