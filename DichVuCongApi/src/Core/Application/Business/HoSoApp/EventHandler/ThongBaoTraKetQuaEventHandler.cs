using Mapster;
using MapsterMapper;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThongBaoTraKetQuaEventHandler : IEventNotificationHandler<ThongBaoTraKetQuaEvent>//Gửi trả kết quả
{
    private readonly IJobService _jobService;
    private readonly ILogger<ThongBaoTraKetQuaEventHandler> _logger;
    private readonly ISMSService _sMSService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "thong_bao_tra_ket_qua_email";
    private readonly string domainName;
    private readonly string tinhThanh;

    public ThongBaoTraKetQuaEventHandler(ISMSService sMSService, ILogger<ThongBaoTraKetQuaEventHandler> logger, IInjectConfiguration injectConfiguration, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _sMSService = sMSService;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");

        _logger = logger;
    }
    public async Task Handle(EventNotification<ThongBaoTraKetQuaEvent> notification, CancellationToken cancellationToken)
    {
        try
        {
            HoSo hoSo = notification.Event.Entity;
            ThongBaoTraKetQuaEvent Event = notification.Event;
            string linkDangKy = HoSoEventUtils.GetLinkChiTietHoSoDaXuLyXong(domainName, hoSo.MaHoSo);

            var dataSdtHoTro = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.SoDienThoaiHoTro>(HoSoEventUtils.sqlPhoneNumberHoTro, new
            {
                MaHoSo = hoSo.MaHoSo
            });
            var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
            {
                MaHoSo = hoSo.MaHoSo
            });
            if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
                if (config != null)
                {

                    Mapper mapper = new Mapper();
                    mapper.Config.Default.MapToConstructor(true);
                    ThongBaoTraKetQuaEmailMapper hoSoEmailMapper = mapper.Map<ThongBaoTraKetQuaEmailMapper>(hoSo);
                    hoSoEmailMapper.HoVaTen = Event.HoVaTen;
                    hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                    hoSoEmailMapper.MaHoSo = hoSo.MaHoSo;
                    hoSoEmailMapper.LinkDangKy = linkDangKy;
                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdtHoTro.PhoneNumber;
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, $"Thông báo trả kết quả giải quyết hồ sơ {hoSo.MaHoSo}", hoSo.MaHoSo, formattedContent);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));

                }
            }
            if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
            {
                _jobService.Enqueue<ISyncDVCQGService>(x => x.DongBoDVCQG(hoSo));
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
            if (hoSo.ThongBaoSMS == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                SMSRequest sMSRequest = new SMSRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, string.Empty, hoSo.MaHoSo, hoSo.DonViId);
                await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.CoKetQua), hoSo, cancellationToken);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
}
