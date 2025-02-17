using Mapster;
using MapsterMapper;
using MediatR;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Common.Events;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThemHoSoTrucTiepEventHandler : IEventNotificationHandler<ThemMoiTrucTiepEvent>
{
    private readonly ILogger<ThemHoSoTrucTiepEventHandler> _logger;
    private readonly IJobService _jobService;
    private readonly ISMSService _sMSService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private const string mailConfigCode = "them_moi_ho_so_truc_tiep_email";
    private readonly string domainName;
    private readonly string tinhThanh;

    public ThemHoSoTrucTiepEventHandler(ISMSService sMSservice, IInjectConfiguration injectConfiguration, ILogger<ThemHoSoTrucTiepEventHandler> logger, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _logger = logger;
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _sMSService = sMSservice;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");

    }

    public async Task Handle(EventNotification<ThemMoiTrucTiepEvent> @event, CancellationToken cancellationToken)
    {
        HoSo hoSo = @event.Event.Entity;
        string tenDonVi = @event.Event.TenDonVi;
        ThemMoiTrucTiepEvent Event = @event.Event;
        if (hoSo.KenhThucHien == "2")
        {
            return;
        }
        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
        {
            string linkTraCuu = HoSoEventUtils.GetLinkTraCuu(domainName, hoSo.MaHoSo, hoSo.SoGiayToNguoiUyQuyen ?? hoSo.SoGiayToChuHoSo ?? string.Empty);
            string linkThanhToan = HoSoEventUtils.GetLinkThanhToan(domainName, hoSo.MaHoSo);

            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
            if (config != null)
            {
                Mapper mapper = new Mapper();
                mapper.Config.Default.MapToConstructor(true);
                TiepNhanHoSoTrucTiepEmailMapper hoSoEmailMapper = mapper.Map<TiepNhanHoSoTrucTiepEmailMapper>(hoSo);
                hoSoEmailMapper.GioNhan = Event.GioNhan;
                hoSoEmailMapper.NgayNhan = Event.NgayNhan;
                hoSoEmailMapper.NgayGioHenTra = Event.NgayGioHenTra;
                hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                hoSoEmailMapper.ThoiHanXuLy = Event.ThoiHanXuLy;
                hoSoEmailMapper.HoTenChuHoSo = Event.HoTenChuHoSo;
                hoSoEmailMapper.TenNguoiNhanHoSo = Event.TenNguoiNhanHoSo;
                hoSoEmailMapper.TenDiaDanh = HoSoEventUtils.GetTenDiaDanh(Event.TenDonVi, Event.GroupCatalog, tinhThanh);
                hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                hoSoEmailMapper.LinkTraCuu = linkTraCuu;
                //hoSoEmailMapper.DangKyNhanKetQuaTai = Event.DangKyNhanKetQuaTai;
                hoSoEmailMapper.LinkThanhToan = linkThanhToan;
                hoSoEmailMapper.SoDienThoaiHoTro = Event.SoDienThoaiHoTro;

                hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, $"Thông báo tiếp nhận hồ sơ và trả kết quả hồ sơ {hoSo.MaHoSo}", hoSo.MaHoSo, formattedContent);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
            }
        }
        if (hoSo.ThongBaoSMS == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
        {
            SMSRequest sMSRequest = new SMSRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, string.Empty, hoSo.MaHoSo, hoSo.DonViId);
            //_jobService.Enqueue<ISMSService>(x => x.SendAsync(sMSRequest, cancellationToken));
            await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.TiepNhan), hoSo, cancellationToken);
        }
        if (hoSo.ThongBaoZalo == true)
        {
            try
            {
                if ((!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
                {

                    string loiNhan = $"Hồ sơ của ông bà đã được thêm trực tiếp thành công.{(!string.IsNullOrEmpty(tenDonVi) ? " Cơ quan tiếp nhận xử lý, " : "")} thời gian tiếp nhận {hoSo.NgayTiepNhan?.ToString("dd /MM/yyyy")}, thời gian hẹn trả {hoSo.NgayHenTra?.ToString("dd/MM/yyyy")}";
                    SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                        null,
                        hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                        hoSo.TrichYeuHoSo,
                        hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                        hoSo.MaHoSo,
                        "Tiếp nhận thành công",
                        hoSo.TrichYeuHoSo,
                        loiNhan,
                        HoSoEventUtils.GetLinkTraCuu("", hoSo.MaHoSo ?? string.Empty, hoSo.SoGiayToNguoiUyQuyen ?? hoSo.SoGiayToChuHoSo ?? string.Empty),
                        null,
                        "Xem Giấy tiếp nhận");
                    ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
                    _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
                }
            }
            catch (Exception ex)
            {

            }
        }
        _jobService.Enqueue<IEMCService>(x => x.SendAction(new EMCRequestBody()
        {
            CodeProfile = hoSo.MaHoSo,
            CodeTTHC = hoSo.MaTTHC,
            NameTTHC = hoSo.TrichYeuHoSo,
            Status = hoSo.TrangThaiHoSoId,
            FormsReception = hoSo.KenhThucHien,
            Level = hoSo.MucDo,
            MaHoSo = hoSo.MaHoSo,
            IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo,
        }));
        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(Event.IdCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
        {
            HoSoId = hoSo.Id,
            Content = "Cán bộ " + Event.TenNguoiNhanHoSo + " Đã tiếp nhận hồ sơ của ông/bà với mã hồ sơ: " + hoSo.MaHoSo,
            CreatedOn = DateTime.Now,
            Description = "",
            IsRead = false,
            MaHoSo = hoSo.MaHoSo,
            Title = "Tiếp nhận trực tiếp thành công",
            Topic = Event.IdCongDan,
            LoaiThongBao = NotificationLoaiThongBao.CongDan,
            Type = NotificationType.ThemMoiTrucTiep
        }, hoSo.Id, CancellationToken.None));
        //_logger.LogInformation("{event} Triggered", @event.Entity.MaHoSo);
    }
}