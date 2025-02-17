using MediatR;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Classes;
using TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.DuThaoXuLyHoSo;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.EventHandler;
public class DuThaoXinLoiEventHandler : IEventNotificationHandler<DuThaoXinLoiEvent>
{
    private readonly ILogger<NopHoSoTrucTuyenEventHandler> _logger;
    private readonly IJobService _jobService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly string domainName;
    private readonly string tinhThanh;
    private readonly IMinioService _minioService;
    private const string mailConfigCode = "du_thao_xin_loi_cong_dan_email";
    public DuThaoXinLoiEventHandler(IMinioService minioService, IInjectConfiguration injectConfiguration, ILogger<NopHoSoTrucTuyenEventHandler> logger, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _logger = logger;
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _minioService = minioService;
        _mailService = mailService;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
    }
    public async Task Handle(EventNotification<DuThaoXinLoiEvent> notification, CancellationToken cancellationToken)
    {
        var hoSo = notification.Event.HoSo;
        DuThaoXinLoiEvent Event = notification.Event;
        var entityZalo = new ZaloPhieuXinLoiMapper()
        {
            HoVaTen = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
            MaHoSo = hoSo.MaHoSo,
            NgayHenTraCu = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayHenTra),
            NgayHenTraMoi = HoSoEventUtils.GetFormatedNgayThangNam(Event.NgayHenTraMoi),
            NgayTiepNhan = HoSoEventUtils.GetFormatedNgayThangNamFirstLetterUpperCase(hoSo.NgayTiepNhan),
            TenDonVi = Event.TenDonVi,
            TenThuTuc = hoSo.TrichYeuHoSo,
        };
        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
        {

            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
            string loiNhan = _mailService.FormatContentWithEntity(entityZalo, config.Content);
            var dicAttach = new Dictionary<string, byte[]>() {  };

            if (config != null)
            {
                var files = Event.DinhKemYKienNguoiChuyenXuLy.Split("##");
                for (int i = 0; i < files.Length; i++)
                {
                    var file = files[i];
                    if (!string.IsNullOrEmpty(file))
                    {
                        StreamDataFile res1 = await _minioService.GetFileByKeyAsync(null, file);
                        var fileData = _minioService.ConvertStreamToBytes(res1.StreamData);
                        var filename = Path.GetFileName(file);
                        dicAttach.Add(filename, fileData);
                    }
                }
                MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo },
                            "Phiếu xin lỗi và hẹn lại ngày trả kết quả", hoSo.MaHoSo, loiNhan, null, null, null, null, null, null, dicAttach);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, CancellationToken.None));
            }
            if (hoSo.ThongBaoZalo == true)
            {
                try
                {
                    if ((!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
                    {
                        string loiNhanZalo = _mailService.FormatContentWithEntity(entityZalo, HoSoEventUtils.LoiNhanDuThaoXinLoi);
                        SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                        null,
                        hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                        hoSo.TrichYeuHoSo,
                        hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                        hoSo.MaHoSo,
                        "Đang xử lý",
                        hoSo.TrichYeuHoSo,
                        loiNhanZalo,
                        HoSoEventUtils.GetLinkAccessFile("", Event.DinhKemYKienNguoiChuyenXuLy),
                        null,
                        "Xem tệp đính kèm");
                        ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
                        _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, CancellationToken.None));
                    }
                }
                catch (Exception ex)
                {
                }
            }
        }
    }
}
