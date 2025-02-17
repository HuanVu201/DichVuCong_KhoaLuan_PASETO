using Mapster;
using MapsterMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThongBaoTraKetQuaChungThucEventHandler : IEventNotificationHandler<ThongBaoTraKetQuaChungThucEvent>
{
    private readonly IJobService _jobService;
    private readonly ILogger<ThongBaoTraKetQuaChungThucEventHandler> _logger;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "thong_bao_tra_ket_qua_email";
    private readonly string domainName;
    private readonly IMinioService _minioService;
    private readonly string tinhThanh;
    public ThongBaoTraKetQuaChungThucEventHandler(ILogger<ThongBaoTraKetQuaChungThucEventHandler> logger, IInjectConfiguration injectConfiguration, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService, IMinioService minioService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
        _minioService = minioService;
        _logger = logger;
    }
    public async Task Handle(EventNotification<ThongBaoTraKetQuaChungThucEvent> notification, CancellationToken cancellationToken)
    {
        try
        {
            HoSo hoSo = notification.Event.Entity;
            ThongBaoTraKetQuaChungThucEvent Event = notification.Event;
            string linkDangKy = HoSoEventUtils.GetLinkChiTietHoSoDaXuLyXong(domainName, hoSo.MaHoSo);

            var dataSdtHoTro = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.SoDienThoaiHoTro>(HoSoEventUtils.sqlPhoneNumberHoTro, new
            {
                MaHoSo = hoSo.MaHoSo
            });
            if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
                if (config != null)
                {
                    string[] words = Event.DinhKem.Split(new string[] { "##" }, StringSplitOptions.RemoveEmptyEntries);
                    var dicAttach = new Dictionary<string, byte[]>();
                    foreach (var word in words)
                    {
                        var filename = Path.GetFileName(word);
                        if (!dicAttach.ContainsKey(filename))
                        {
                            StreamDataFile res1 = await _minioService.GetFileByKeyAsync(null, word);
                            var fileData = _minioService.ConvertStreamToBytes(res1.StreamData);
                            dicAttach.Add(filename, fileData);
                        }
                    }
                    Mapper mapper = new Mapper();
                    mapper.Config.Default.MapToConstructor(true);
                    ThongBaoTraKetQuaEmailMapper hoSoEmailMapper = mapper.Map<ThongBaoTraKetQuaEmailMapper>(hoSo);
                    hoSoEmailMapper.HoVaTen = Event.HoVaTen;
                    hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                    hoSoEmailMapper.MaHoSo = hoSo.MaHoSo;
                    hoSoEmailMapper.LinkDangKy = linkDangKy;
                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdtHoTro.PhoneNumber;
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, $"Thông báo trả kết quả giải quyết hồ sơ {hoSo.MaHoSo}", hoSo.MaHoSo,
                        formattedContent, null, null, null, null, null, null, dicAttach);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));

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
                User = hoSo.SoGiayToChuHoSo
            }));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
}
