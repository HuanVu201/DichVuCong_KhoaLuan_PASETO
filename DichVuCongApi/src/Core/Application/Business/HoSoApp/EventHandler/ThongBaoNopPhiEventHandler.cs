using Mapster;
using MapsterMapper;
using MediatR;
using System.ComponentModel.Design;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Format;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class ThongBaoNopPhiEventHandler : IEventNotificationHandler<ThongBaoNopPhiEvent>
{
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrency _currency;
    private const string mailConfigCode = "thong_bao_thu_phi_email";
    private const string mailConfigCodeThuSau = "thong_bao_thu_phi_thu_sau_email";
    private const string mailConfigCodeBQL = "thong_bao_nop_phi_bql_email";
    private readonly string donameName;
    private readonly string tinhThanh;
    private readonly ISerializerService _serializerService;
    public ThongBaoNopPhiEventHandler(ISerializerService serializerService, IInjectConfiguration injectConfiguration, ICurrency currency, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _currency = currency;
        donameName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
        _serializerService = serializerService;
    }
    public async Task Handle(EventNotification<ThongBaoNopPhiEvent> notification, CancellationToken cancellationToken)
    {
        ThongBaoNopPhiEvent Event = notification.Event;
        HoSo hoSo = notification.Event.Entity;
        var lephichothu = Event.SoTienLePhi;
        var phichothu = Event.SoTienPhi;
        var soTien = string.Empty;
        int tongTien = Event.SoTienPhi + Event.SoTienLePhi;
        string formatTongTien = _currency.GetCurrency(tongTien);
        var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
        {
            MaHoSo = hoSo.MaHoSo
        });

        string linkThanhToan = HoSoEventUtils.GetLinkThanhToan(donameName, hoSo.MaHoSo);
        if (lephichothu > 0)
        {
            if (phichothu > 0)
            {

                soTien = "Lệ phí " + lephichothu + " đồng, Phí " + phichothu + " đồng";
            }
            else
            {
                soTien = "Lệ phí " + lephichothu + " đồng";
            }
        }
        else
        {
            if (phichothu > 0)
            {
                soTien = "Phí " + phichothu + " đồng";
            }
            else
            {
                soTien = "Chưa nhập số tiền thu lệ phí, phí";
            }
        }
        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)))
        {
            if(Event.HinhThucPhi == YeuCauThanhToanConstant.HinhThucThu_ThuSau)
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
                if (config != null)
                {

                    Mapper mapper = new Mapper();
                    mapper.Config.Default.MapToConstructor(true);
                    ThongBaoNopPhiThuSauEmailMapper hoSoEmailMapper = mapper.Map<ThongBaoNopPhiThuSauEmailMapper>(hoSo);
                    hoSoEmailMapper.HoTenNguoiNop = Event.HoTenNguoiNop;
                    hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                    hoSoEmailMapper.SoTienPhiLePhi = formatTongTien;
                    hoSoEmailMapper.SoTienBangChu = _currency.NumberToCurrencyText(tongTien);
                    hoSoEmailMapper.TenNguoiTiepNhan = Event.TenNguoiTiepNhan;
                    hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdtNguoiTiepNhan.PhoneNumber;
                    hoSoEmailMapper.TenDonViCon = Event.TenDonViCon;
                    hoSoEmailMapper.TenDiaDanh = Event.TenDiaDanh;
                    hoSoEmailMapper.LinkThanhToan = linkThanhToan;
                    hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, $"Thông báo nộp phí, lệ phí hồ sơ {hoSo.MaHoSo}", hoSo.MaHoSo, formattedContent);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
                }
            } else
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
                if (config != null)
                {
                    Mapper mapper = new Mapper();
                    mapper.Config.Default.MapToConstructor(true);
                    ThongBaoNopPhiEmailMapper hoSoEmailMapper = mapper.Map<ThongBaoNopPhiEmailMapper>(hoSo);
                    hoSoEmailMapper.HoTenNguoiNop = Event.HoTenNguoiNop;
                    hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                    hoSoEmailMapper.HinhThucPhi = Event.HinhThucPhi;
                    hoSoEmailMapper.SoTienPhiLePhi = formatTongTien;
                    hoSoEmailMapper.SoTienBangChu = _currency.NumberToCurrencyText(tongTien);
                    hoSoEmailMapper.TenNguoiTiepNhan = Event.TenNguoiTiepNhan;
                    hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                    hoSoEmailMapper.SoDienThoaiHoTro = Event.SoDienThoaiHoTro;
                    hoSoEmailMapper.TenDonViCon = Event.TenDonViCon;
                    hoSoEmailMapper.TenDiaDanh = HoSoEventUtils.GetTenDiaDanh(Event.TenDonViCha, Event.GroupCatalog, tinhThanh);
                    hoSoEmailMapper.LinkThanhToan = linkThanhToan;
                    hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, "Thông báo việc nộp phí lệ phí", hoSo.MaHoSo, formattedContent);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
                }
            }
        }
        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(Event.IdCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
        {
            HoSoId = hoSo.Id,
            Content = "",
            CreatedOn = DateTime.Now,
            Description = "",
            IsRead = false,
            MaHoSo = hoSo.MaHoSo,
            Title = $"Yêu cầu thu phí đối với hồ sơ mã số {hoSo.MaHoSo}",
            Topic = Event.IdCongDan,
            Data = _serializerService.Serialize(new
            {
                YeuCauThanhToanId = Event.YeuCauThanhToanId
            }),
            Link = HoSoEventUtils.GetLinkThanhToan(donameName, hoSo.MaHoSo),
            LoaiThongBao = NotificationLoaiThongBao.CongDan,
            Type = NotificationType.YeuCauThucHienNghiaVuTaiChinh
        }, hoSo.Id, CancellationToken.None));
        try
        {
            if (hoSo.ThongBaoZalo == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                
                string loiNhan = "Hồ sơ của ông bà có yêu cầu nộp phí, lệ phí ngày " + HoSoEventUtils.GetFormatedNgayThangNam(DateTime.Now) + ". " + formatTongTien;
                SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                    null,
                    hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                    hoSo.TrichYeuHoSo,
                    hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                    hoSo.MaHoSo,
                    "Yêu cầu Thanh toán phí, lệ phí",
                    hoSo.TrichYeuHoSo,
                    loiNhan,
                    HoSoEventUtils.GetLinkThanhToan("", hoSo.MaHoSo),
                    null,
                    "Thanh toán phí, lệ phí");
                ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
                _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
            }
        }
        catch (Exception ex)
        {

        }
       
    }
}
