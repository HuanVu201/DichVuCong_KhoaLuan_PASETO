using Mapster;
using MapsterMapper;
using MediatR;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class TuChoiTiepNhanTrucTuyenEventHandler : IEventNotificationHandler<TuChoiTiepNhanTrucTuyenEvent>
{
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly ISMSService _sMSService;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "tu_choi_tiep_nhan_truc_tuyen_email";
    private readonly IMinioService _minioService;
    private readonly string tinhThanh;

    public TuChoiTiepNhanTrucTuyenEventHandler(ISMSService sMSService, IDapperRepository dapperRepository, IInjectConfiguration injectConfiguration, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService, IMinioService minioService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _sMSService = sMSService;
        _minioService = minioService;
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");

    }
    public async Task Handle(EventNotification<TuChoiTiepNhanTrucTuyenEvent> notification, CancellationToken cancellationToken)
    {
        HoSo hoSo = notification.Event.Entity;
        var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
        {
            MaHoSo = hoSo.MaHoSo
        });

        

        TuChoiTiepNhanTrucTuyenEvent Event = notification.Event;
        var loiNhan = $"Thông báo Từ chối tiếp nhận hồ sơ với mã {hoSo.MaHoSo}. Lý do từ chối: {Event.LyDoTraLai}";
        if (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo))
        {
            var sdt = hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo;
            if (hoSo.ThongBaoSMS == true)
            {
                SMSRequest sMSRequest = new SMSRequest(sdt, loiNhan, hoSo.MaHoSo, hoSo.DonViId);
                await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.TraLai), hoSo, cancellationToken);
                //_jobService.Enqueue<ISMSService>(x => x.SendAsync(sMSRequest, cancellationToken));
            }
            if (hoSo.ThongBaoZalo == true)
            {
                ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
                SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(null, sdt, hoSo.TrichYeuHoSo, hoSo.ChuHoSo,
                hoSo.MaHoSo, "Từ chối tiếp nhận hồ sơ", hoSo.TrichYeuHoSo, loiNhan, hoSo.MaHoSo, null, "Xem chi tiết");
                _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
            }


        }
        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
        {
            string sqlGiayToHoSo = "SELECT * FROM [Business].[GiayToHoSos] WHERE MaHoSo = @maHoSo";
            var giayToHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToHoSo>(sqlGiayToHoSo, new { maHoSo = hoSo.MaHoSo });
            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);

            if (config != null && giayToHoSo != null)
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
                TuChoiTiepNhanTrucTuyenEmailMapper hoSoEmailMapper = mapper.Map<TuChoiTiepNhanTrucTuyenEmailMapper>(hoSo);
                hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                hoSoEmailMapper.HoTenNguoiNop = Event.HoTenNguoiNop;
                hoSoEmailMapper.DiaChiNguoiNop = Event.DiaChiNguoiNop;
                hoSoEmailMapper.SoDienThoaiNguoiNop = Event.SoDienThoaiNguoiNop;
                hoSoEmailMapper.EmailNguoiNop = Event.EmailNguoiNop;
                hoSoEmailMapper.LyDoTuChoi = Event.LyDoTraLai;
                hoSoEmailMapper.TenNguoiTuChoi = Event.TenNguoiTiepNhan;
                hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                hoSoEmailMapper.TenDiaDanh = HoSoEventUtils.GetTenDiaDanh(Event.TenDonVi, Event.GroupCatalog, tinhThanh);
                hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                hoSoEmailMapper.TenHoSo = Event.TenHoSo;
                var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo },
                    "Thông báo Từ chối tiếp nhận hồ sơ", hoSo.MaHoSo, formattedContent, null, null, null, null, null, null, dicAttach);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
            }
        }
        if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
        {
            _jobService.Enqueue<ISyncDVCQGService>(x => x.DongBoDVCQG(hoSo));
        }
        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(Event.IdCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
        {
            HoSoId = hoSo.Id,
            Content = hoSo.LyDoTuChoi ?? "",
            CreatedOn = DateTime.Now,
            Description = "",
            IsRead = false,
            MaHoSo = hoSo.MaHoSo,
            Title = $"Hồ sơ mã số: {hoSo.MaHoSo} đã bị từ chối",
            Topic = Event.IdCongDan,
            LoaiThongBao = NotificationLoaiThongBao.CongDan,
            Type = NotificationType.TuChoiTiepNhan
        }, hoSo.Id, CancellationToken.None));
    }
}
