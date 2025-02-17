using Mapster;
using MapsterMapper;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class YeuCauCongDanBosungEventHandler : IEventNotificationHandler<YeuCauCongDanBoSungEvent>
{
    private readonly IJobService _jobService;
    private readonly ICurrentUser _user;
    private readonly ISMSService _sMSService;
    private readonly ILogger<YeuCauCongDanBosungEventHandler> _logger;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "yeu_cau_cong_dan_bo_sung_email";
    public YeuCauCongDanBosungEventHandler(ISMSService sMSService, IDapperRepository dapperRepository, ICurrentUser user, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService, ILogger<YeuCauCongDanBosungEventHandler> logger)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _logger = logger;
        _user = user;
        _sMSService = sMSService;
    }
    private string RenderThanhPhanHoSoHtml(IReadOnlyList<ThanhPhanHoSoDto> thanhPhanHoSos)
    {
        var res = string.Empty;
        for (int i = 0; i < thanhPhanHoSos.Count; i++)
        {
            var item = thanhPhanHoSos[i];
            res += $"<tr style=\"\"> <td style=\" border: solid windowtext 1.0pt; padding: 0in 5.4pt 0in 5.4pt; height: 15.2pt;\" rowspan=\"\" width=\"1%\"> <p style=\"text-align: center; line-height: normal; margin: 0in -2.85pt .0001pt -2.85pt;\"> <span style=\"font-size: 14.0pt; font-family: 'Times New Roman','serif';\">{i + 1}</span> </p> </td> <td style=\" border: solid windowtext 1.0pt; border-left: none; padding: 0in 5.4pt 0in 5.4pt; height: 15.2pt;\" rowspan=\"\" width=\"70%\"> <p style=\"text-align: center; line-height: normal; margin: 0in -2.85pt .0001pt -2.85pt;\"> <span style=\"font-size: 14.0pt; font-family: 'Times New Roman','serif';\">{item.Ten}</span></p> </td> </tr>";
        }
        return res;
    }
    public async Task Handle(EventNotification<YeuCauCongDanBoSungEvent> notification, CancellationToken cancellationToken)
    {
        try{
            HoSo hoSo = notification.Event.Entity;
            var dataSdt = string.Empty;
            if (hoSo.TrangThaiHoSoId == "1" && string.IsNullOrEmpty(hoSo.NguoiNhanHoSo))
            {
                var dataSdtNguoiTiepNhanHienTai = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhanHienTai, new
                {
                    id = _user.GetUserId()
                });
                dataSdt = dataSdtNguoiTiepNhanHienTai.PhoneNumber;
            }
            else
            {
                var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
                {
                    MaHoSo = hoSo.MaHoSo
                });
                dataSdt = dataSdtNguoiTiepNhan.PhoneNumber;
            }


            YeuCauCongDanBoSungEvent Event = notification.Event;
            if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);

                if (config != null)
                {
                    var searchThanhPhanHoSo = new SearchThanhPhanHoSoQuery()
                    {
                        HoSo = hoSo.MaHoSo,
                    };
                    var searchThanhPhanHoSoSql = SearchThanhPhanHoSoQueryWhereBuilder.Build(searchThanhPhanHoSo);
                    var thanhPhanHoSos = await _dapperRepository.QueryAsync<ThanhPhanHoSoDto>(searchThanhPhanHoSoSql, searchThanhPhanHoSo);
                    Mapper mapper = new Mapper();
                    mapper.Config.Default.MapToConstructor(true);
                    YeuCauCongDanBoSungEmailMapper hoSoEmailMapper = mapper.Map<YeuCauCongDanBoSungEmailMapper>(hoSo);
                    hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                    hoSoEmailMapper.HoTenNguoiNop = Event.HoTenNguoiNop;
                    hoSoEmailMapper.LyDoBoSung = Event.LyDoBoSung;
                    hoSoEmailMapper.TenNguoiTiepNhan = Event.TenNguoiTiepNhan;
                    hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                    hoSoEmailMapper.TenHoSo = Event.TenHoSo;
                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdt ?? "";
                    hoSoEmailMapper.TenDiaDanh = Event.TenDiaDanh;
                    hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                    hoSoEmailMapper.ThanhPhanHoSos = RenderThanhPhanHoSoHtml(thanhPhanHoSos);
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, $"Yêu cầu bổ sung hồ sơ với mã: {hoSo.MaHoSo} ", hoSo.MaHoSo, formattedContent);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
                }
            }
            if (hoSo.ThongBaoSMS == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                SMSRequest sMSRequest = new SMSRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, string.Empty, hoSo.MaHoSo, hoSo.DonViId);
                await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.YeuCauBoSung), hoSo, cancellationToken);
                //_jobService.Enqueue<ISMSService>(x => x.SendAsync(sMSRequest, cancellationToken));
            }
            _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(Event.IdCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
            {
                HoSoId = hoSo.Id,
                Content = "",
                CreatedOn = DateTime.Now,
                Description = "",
                IsRead = false,
                MaHoSo = hoSo.MaHoSo,
                Title = $"Yêu cầu bổ sung đối với hồ sơ mã số {hoSo.MaHoSo}",
                Topic = Event.IdCongDan,
                LoaiThongBao = NotificationLoaiThongBao.CongDan,
                Type = NotificationType.YeuCauBoSung
            }, hoSo.Id, CancellationToken.None));
        }
        catch(Exception e)
        {
            _logger.LogError(e.ToString());
        }
        
    }
}
