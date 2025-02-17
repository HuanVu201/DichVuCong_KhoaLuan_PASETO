using Mapster;
using MapsterMapper;
using MediatR;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class NopHoSoTrucTuyenEventHandler : IEventNotificationHandler<NopHoSoTrucTuyenEvent>
{
    private readonly ILogger<NopHoSoTrucTuyenEventHandler> _logger;
    private readonly IJobService _jobService;
    private readonly ISMSService _sMSService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly string domainName;
    private readonly string tinhThanh;
    private const string mailConfigCode = "nop_ho_so_truc_tuyen_email";
    public NopHoSoTrucTuyenEventHandler(ISMSService sMSService, IInjectConfiguration injectConfiguration, ILogger<NopHoSoTrucTuyenEventHandler> logger, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _logger = logger;
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _sMSService = sMSService;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
    }
    public async Task Handle(EventNotification<NopHoSoTrucTuyenEvent> notification, CancellationToken cancellationToken)
    {
        HoSo hoSo = notification.Event.Entity;
        string tenDonVi = notification.Event.TenDonVi;
       
        string tenTTHC = notification.Event.TenTTHC;
        NopHoSoTrucTuyenEvent Event = notification.Event;
      
        

        if (hoSo.KenhThucHien != "2")
        {
            return;
        }
        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
        {
            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
            string sqlPhoneNumberHoTroEmailTrucTuyen = @$"SELECT SoDienThoai FROM Catalog.Groups WHERE GroupName = @TenDonVi";
            var dataSdtHoTro = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.SoDienThoaiHoTroTrucTuyen>(sqlPhoneNumberHoTroEmailTrucTuyen, new
            {
                TenDonVi = Event.TenDonVi
            });
            if (config != null)
            {
                Mapper mapper = new Mapper();
                mapper.Config.Default.MapToConstructor(true);
                NopHoSoTrucTuyenEmailMapper hoSoEmailMapper = mapper.Map<NopHoSoTrucTuyenEmailMapper>(hoSo);
                hoSoEmailMapper.TenDonVi = tenDonVi;
                hoSoEmailMapper.TenTTHC = tenTTHC;
                hoSoEmailMapper.HoTenNguoiNop = Event.HoTenNguoiNop;
                hoSoEmailMapper.NgayNopHoSoString = Event.NgayNopHoSo;
                hoSoEmailMapper.SoDienThoaiHoTro = dataSdtHoTro.SoDienThoai;
                hoSoEmailMapper.LinkDangKy = HoSoEventUtils.GetLinkChiTietHoSo(domainName,hoSo.MaHoSo);
                var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, "Thông báo hồ sơ đã được đăng kí thành công", hoSo.MaHoSo, formattedContent);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
            }
        }
        if (hoSo.ThongBaoSMS == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
        {
            SMSRequest sMSRequest = new SMSRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, string.Empty, hoSo.MaHoSo, hoSo.DonViId);
            //_jobService.Enqueue<ISMSService>(x => x.SendAsync(sMSRequest, cancellationToken));
            await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.NopTrucTuyen), hoSo, cancellationToken);
        }

        try
        {
            if (hoSo.ThongBaoZalo == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                    null,
                    hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                    hoSo.TrichYeuHoSo,
                    hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                    hoSo.MaHoSo,
                    "Đăng ký thành công",
                    hoSo.TrichYeuHoSo,
                    $"Hồ sơ đã được đăng ký thành công (Thời gian phản hồi 08 giờ làm việc)",
                    HoSoEventUtils.GetLinkChiTietHoSo("", hoSo.MaHoSo),
                    null,
                    "Xem chi tiết hồ sơ");
                ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, $"Hồ sơ đã được đăng ký thành công với mã: {hoSo.MaHoSo}", hoSo.MaHoSo);
                _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
            }
        }
        catch (Exception ex)
        {

        }

        _jobService.Enqueue<IEMCService>(x => x.SendAction(new EMCRequestBody()
        {
            CodeProfile = hoSo.MaHoSo,
            CodeTTHC = hoSo.MaTTHC,
            NameTTHC = tenTTHC,
            Status = hoSo.TrangThaiHoSoId,
            FormsReception = hoSo.KenhThucHien,
            Level = hoSo.MucDo,
            MaHoSo = hoSo.MaHoSo,
            IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo
        }));

        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(Event.IdCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
        {
            HoSoId = hoSo.Id,
            Content = "",
            CreatedOn = DateTime.Now,
            Description = "",
            IsRead = false,
            MaHoSo = hoSo.MaHoSo,
            Title = $"Hồ sơ mã số: {hoSo.MaHoSo} đã gửi thành công",
            LoaiThongBao = NotificationLoaiThongBao.CongDan,
            Topic = Event.IdCongDan,
            Type = NotificationType.ChoTiepNhanTrucTuyen
        }, hoSo.Id, CancellationToken.None));

        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
        {
            MaHoSo = hoSo.MaHoSo
        });
        if(nguoiTiepNhan != null)
        {
            _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(nguoiTiepNhan.UserName, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
            {
                HoSoId = hoSo.Id,
                Content = "",
                CreatedOn = DateTime.Now,
                Description = "",
                IsRead = false,
                MaHoSo = hoSo.MaHoSo,
                Title = $"Có hồ sơ chờ tiếp nhận mới với mã: {hoSo.MaHoSo}",
                LoaiThongBao = NotificationLoaiThongBao.CanBo,
                Topic = nguoiTiepNhan.UserName,
                Type = NotificationType.ChoTiepNhanTrucTuyen,
                FullPath = HoSoEventUtils.GetMenuFullPath(hoSo, null, "1", null)
            }, hoSo.Id, CancellationToken.None));
        }
    }
}
