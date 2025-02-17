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
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThongBaoBuuDienTraKqEventHandler : IEventNotificationHandler<ThongBaoBuuDienTraKqEvent>//Gửi trả kết quả
{
    private readonly IJobService _jobService;
    private readonly ILogger<ThongBaoBuuDienTraKqEventHandler> _logger;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "thong_bao_tra_ket_qua_email";
    private readonly string domainName;
    private readonly string tinhThanh;

    public ThongBaoBuuDienTraKqEventHandler(ILogger<ThongBaoBuuDienTraKqEventHandler> logger, IInjectConfiguration injectConfiguration, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");

        _logger = logger;
    }
    public async Task Handle(EventNotification<ThongBaoBuuDienTraKqEvent> notification, CancellationToken cancellationToken)
    {
        try
        {
            HoSo hoSo = notification.Event.Entity;
            ThongBaoBuuDienTraKqEvent Event = notification.Event;
            string linkDangKy = HoSoEventUtils.GetLinkChiTietHoSoDaXuLyXong(domainName, hoSo.MaHoSo);

            var dataSdtHoTro = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.SoDienThoaiHoTro>(HoSoEventUtils.sqlPhoneNumberHoTro, new
            {
                MaHoSo = hoSo.MaHoSo
            });
            var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
            {
                MaHoSo = hoSo.MaHoSo
            });
            //if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
            //{
            //    Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
            //    if (config != null)
            //    {
            //        Mapper mapper = new Mapper();
            //        mapper.Config.Default.MapToConstructor(true);
            //        ThongBaoBuuDienTraKqEmailMapper hoSoEmailMapper = mapper.Map<ThongBaoBuuDienTraKqEmailMapper>(hoSo);
            //        hoSoEmailMapper.HoVaTen = Event.HoVaTen;
            //        hoSoEmailMapper.TenDonVi = Event.TenDonVi;
            //        hoSoEmailMapper.MaHoSo = hoSo.MaHoSo;
            //        hoSoEmailMapper.LinkDangKy = linkDangKy;
            //        hoSoEmailMapper.SoDienThoaiHoTro = dataSdtHoTro.PhoneNumber;
            //        var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
            //        MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, $"Thông báo trả kết quả giải quyết hồ sơ {hoSo.MaHoSo}", hoSo.MaHoSo, formattedContent);
            //        _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
            //    }
            //}

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
}
