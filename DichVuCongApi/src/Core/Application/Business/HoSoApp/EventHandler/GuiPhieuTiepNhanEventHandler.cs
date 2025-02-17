using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Transactions;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using System;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class GuiPhieuTiepNhanEventHandler : IEventNotificationHandler<GuiPhieuTiepNhanEvent>
{
    private const string mailConfigCode = "gui_phieu_tiep_nhan_email";
    private readonly string tenTinhThanh;
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private readonly string domainName;
    private readonly IMinioService _minioService;
    private readonly IUserService _user;
    private readonly IEventPublisher _eventPublisher;
    private readonly IInjectConfiguration _injectConfiguration;

    public GuiPhieuTiepNhanEventHandler(IInjectConfiguration injectConfiguration, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig,
        IMailService mailService, IMinioService minioService, IUserService user, IEventPublisher eventPublisher)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _injectConfiguration = injectConfiguration;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        _minioService = minioService;
        _user = user;
        _eventPublisher = eventPublisher;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");
    }


    public async Task Handle(EventNotification<GuiPhieuTiepNhanEvent> @event, CancellationToken cancellationToken)
    {
        HoSo hoSo = @event.Event.Entity;
        GuiPhieuTiepNhanEvent Event = @event.Event;

        string sqlGiayToHoSo = "SELECT * FROM [Business].[GiayToHoSos] WHERE MaGiayTo = @maGiayToHoSo And SuDung='1'";
        var giayToHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<GiayToHoSo>(sqlGiayToHoSo, new { maGiayToHoSo = Event.MaGiayTo });
        if (giayToHoSo == null)
        {
            throw new NotFoundException($"Giấy tờ hồ sơ với mã hồ sơ: {hoSo.MaHoSo} chưa được thêm vào hệ thống");
        }

        //GiayToHoSo giayToHoSo = @event.Event.Entity2;
        string tenDonVi = @event.Event.TenDonVi;

        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
        {
            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
            if (config != null)
            {
                StreamDataFile res1 = await _minioService.GetFileByKeyAsync(null, giayToHoSo.PDFPhieu);
                var fileData = _minioService.ConvertStreamToBytes(res1.StreamData);
                var filename = Path.GetFileName(giayToHoSo.PDFPhieu);
                var dicAttach = new Dictionary<string, byte[]>() { { filename, fileData } };

                Mapper mapper = new Mapper();

                mapper.Config.Default.MapToConstructor(true);
                GuiPhieuTiepNhanEmailMapper hoSoEmailMapper = mapper.Map<GuiPhieuTiepNhanEmailMapper>(hoSo);

                hoSoEmailMapper.HoTenChuHoSo = Event.HoTenChuHoSo;
                hoSoEmailMapper.TenTinhThanh = tenTinhThanh;
                hoSoEmailMapper.MaHoSo = hoSo.MaHoSo;
                hoSoEmailMapper.SoDienThoaiHoTro = Event.SoDienThoaiHoTro;
                hoSoEmailMapper.TenNguoiNhanHoSo = Event.TenNguoiNhanHoSo;
                hoSoEmailMapper.TenDonVi = Event.TenDonVi;

                var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);

                
                MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo },
                    "Thông tin Phiếu tiếp nhận và hẹn trả kết quả", hoSo.MaHoSo, formattedContent, null, null, null, null, null, null, dicAttach);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));

            }
        }
    }
}