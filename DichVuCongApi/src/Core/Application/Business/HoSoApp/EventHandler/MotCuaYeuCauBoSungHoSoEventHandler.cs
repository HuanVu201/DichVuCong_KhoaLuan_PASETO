using MapsterMapper;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using Mapster;
using MediatR;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class MotCuaYeuCauBoSungHoSoEventHandler : IEventNotificationHandler<MotCuaYeuCauBoSungHoSoEvent>
{
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "email_mot_cua_yeu_cau_bo_sung_nop_truc_tuyen";
    private readonly string tenTinhThanh;
    private readonly string domainName;
    private readonly IMinioService _minioService;
    private readonly IUserService _user;
    private readonly ICurrentUser _currentUser;
    private readonly IEventPublisher _eventPublisher;
    private readonly IInjectConfiguration _injectConfiguration;


    public MotCuaYeuCauBoSungHoSoEventHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService, IMinioService minioService, IUserService userService, IEventPublisher eventPublisher, IInjectConfiguration injectConfiguration)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _currentUser = currentUser;
        _minioService = minioService;
        _user = userService;
        _eventPublisher = eventPublisher;
        _injectConfiguration = injectConfiguration;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");

    }
    public async Task Handle(EventNotification<MotCuaYeuCauBoSungHoSoEvent> notification, CancellationToken cancellationToken)
    {
        HoSo hoSo = notification.Event.Entity;
        MotCuaYeuCauBoSungHoSoEvent Event = notification.Event;
        var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhanHienTai, new
        {
            id = _currentUser.GetUserId()
        });
        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(dataSdtNguoiTiepNhan.UserName, new CreateFirebaseNotificationCommand()
        {
            HoSoId = hoSo.Id,
            Content = $"Yêu cầu bổ sung đối với hồ sơ mã số {hoSo.MaHoSo}",
            CreatedOn = DateTime.Now,
            Description = "",
            IsRead = false,
            MaHoSo = hoSo.MaHoSo,
            LoaiThongBao = NotificationLoaiThongBao.CanBo,
            Title = "",
            Topic = dataSdtNguoiTiepNhan.UserName,
            Type = NotificationType.YeuCauBoSung,
            FullPath = HoSoEventUtils.GetMenuFullPath(hoSo, null, Event.MaTrangThaiMoi, null)
        }, hoSo.Id, CancellationToken.None));

        string sqlGiayToHoSo = "SELECT * FROM [Business].[GiayToHoSos] WHERE MaGiayTo = @maGiayTo And SuDung='1'";
        var giayToHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToHoSo>(sqlGiayToHoSo, new { maGiayTo = Event.MaGiayToHoSo });
        if (giayToHoSo == null)
        {
            throw new NotFoundException($"Giấy tờ hồ sơ với mã hồ sơ: {hoSo.MaHoSo} chưa được thêm vào hệ thống");
        }

        //GiayToHoSo giayToHoSo = @event.Event.Entity2;
        if(hoSo.TrangThaiBoSung == HoSoConstant.TrangThaiBoSungMotCua)
        {
            return; // chỉ gửi mail cho công dân
        }

        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
        {

            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
            if (config != null)
            {
                Dictionary<string, byte[]> dicAttach = new Dictionary<string, byte[]>();
                if (!string.IsNullOrEmpty(giayToHoSo.PDFPhieu))
                {
                    string[] arrUrl = giayToHoSo.PDFPhieu.Split("##");
                    foreach (var urlPhieu in arrUrl)
                    {
                        StreamDataFile res = await _minioService.GetFileByKeyAsync(null, urlPhieu);
                        var fileData = _minioService.ConvertStreamToBytes(res.StreamData);
                        var filename = Path.GetFileName(urlPhieu);
                        dicAttach.Add(filename, fileData);
                    }
                }

                Mapper mapper = new Mapper();
                mapper.Config.Default.MapToConstructor(true);
                MotCuaYeuCauBoSungEmailMapper hoSoEmailMapper = mapper.Map<MotCuaYeuCauBoSungEmailMapper>(hoSo);
                hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                hoSoEmailMapper.MaHoSo = Event.MaHoSo;
                hoSoEmailMapper.TenDiaDanh = Event.TenDiaDanh;
                hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                hoSoEmailMapper.HoTenNguoiNop = Event.HoTenNguoiNop;
                hoSoEmailMapper.TenHoSo = Event.TenHoSo;
                hoSoEmailMapper.LyDoBoSung = Event.LyDoBoSung;
                hoSoEmailMapper.ThoiGianBoSung = Event.ThoiHanBoSung;
                hoSoEmailMapper.SoDienThoaiHoTro = Event.SoDienThoaiHoTro;
                hoSoEmailMapper.TenNguoiHuongDan = Event.TenNguoiHuongDan;
                hoSoEmailMapper.TenNguoiHuongDan = Event.TenNguoiHuongDan;

                var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);


                MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo },
                    "Thông tin Yêu cầu bổ sung hồ sơ nộp trực tuyến", hoSo.MaHoSo, formattedContent, null, null, null, null, null, null, dicAttach);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));

            }
        }
    }
}
