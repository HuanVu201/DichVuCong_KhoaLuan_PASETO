using Mapster;
using MapsterMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ActionApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThongBaoCoKetQuaEventHandler : IEventNotificationHandler<ThongBaoCoKetQuaEvent>
{
    private readonly IJobService _jobService;
    private readonly ILogger<ThongBaoCoKetQuaEventHandler> _logger;
    private readonly ISMSService _sMSService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "email_khi_co_ket_qua";

    public ThongBaoCoKetQuaEventHandler(ISMSService sMSService, ILogger<ThongBaoCoKetQuaEventHandler> logger, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _logger = logger;
        _sMSService = sMSService;
    }
    public async Task Handle(EventNotification<ThongBaoCoKetQuaEvent> notification, CancellationToken cancellationToken)
    {
        try
        {
            HoSo hoSo = notification.Event.Entity;
            ThongBaoCoKetQuaEvent Event = notification.Event;
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
                    ThongBaoCoKetQuaEmailMapper hoSoEmailMapper = mapper.Map<ThongBaoCoKetQuaEmailMapper>(hoSo);
                    hoSoEmailMapper.HoTenNguoiNop = Event.HoTenNguoiNop;
                    hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                    hoSoEmailMapper.MaHoSo = Event.MaHoSo;
                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdtNguoiTiepNhan.PhoneNumber;
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, $"Thông báo hồ sơ {hoSo.MaHoSo} đã có kết quả", hoSo.MaHoSo, formattedContent);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
                }
            }
            //if (hoSo.ThongBaoZalo == true)
            //{
            //    try
            //    {
            //        if ((!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            //        {

            //            string loiNhan = $"Hồ sơ của ông bà đã được thêm trực tiếp thành công.{(!string.IsNullOrEmpty(tenDonVi) ? " Cơ quan tiếp nhận xử lý, " : "")} thời gian tiếp nhận {hoSo.NgayTiepNhan?.ToString("dd /MM/yyyy")}, thời gian hẹn trả {hoSo.NgayHenTra?.ToString("dd/MM/yyyy")}";
            //            SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
            //                null,
            //                hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
            //                hoSo.TrichYeuHoSo,
            //                hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
            //                hoSo.MaHoSo,
            //                "Tiếp nhận thành công",
            //                hoSo.TrichYeuHoSo,
            //                loiNhan,
            //                HoSoEventUtils.GetLinkTraCuu("", hoSo.MaHoSo),
            //                null,
            //                "Xem Giấy tiếp nhận");
            //            ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
            //            _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
            //        }
            //    }
            //    catch (Exception ex)
            //    {

            //    }
            //}
            if (hoSo.ThongBaoSMS == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                SMSRequest sMSRequest = new SMSRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, string.Empty, hoSo.MaHoSo, hoSo.DonViId);
                await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.TraKetQua), hoSo, cancellationToken);
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
                User = hoSo.SoGiayToChuHoSo
            }));
            // đã trả kết quả về cho công dân : trạng thái 10
            _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(Event.IdCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
            {
                HoSoId = hoSo.Id,
                Content = "Hồ sơ mã số: " + hoSo.MaHoSo + " đã có kết quả",
                CreatedOn = DateTime.Now,
                Description = "",
                IsRead = false,
                MaHoSo = hoSo.MaHoSo,
                Title = "Hồ sơ đã có kết quả",
                Topic = Event.IdCongDan,
                LoaiThongBao = NotificationLoaiThongBao.CongDan,
                Type = NotificationType.DaCoKetQua
            }, hoSo.Id, CancellationToken.None));
        } catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
       
    }
}
