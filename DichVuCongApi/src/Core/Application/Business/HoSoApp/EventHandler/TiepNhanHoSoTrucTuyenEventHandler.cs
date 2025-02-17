using Mapster;
using MapsterMapper;
using Microsoft.Extensions.Logging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
using TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EventHandler;
public class TiepNhanHoSoTrucTuyenEventHandler : IEventNotificationHandler<TiepNhanHoSoTrucTuyenEvent>
{
    private readonly IJobService _jobService;
    private readonly IReadRepository<Config> _readRepositoryConfig;
    private readonly IMailService _mailService;
    private readonly ISMSService _sMSService;
    private readonly IDapperRepository _dapperRepository;
    private const string mailConfigCode = "tiep_nhan_ho_so_truc_tuyen_email";
    private const string mailConfigCodeKhongNgayHenTra = "tiep_nhan_ho_so_truc_tuyen_khong_ngay_hen_tra_email";
    private const string mailConfigCodeTBKM = "thong_bao_khuyen_mai_email";
    private readonly string domainName;
    private readonly string tinhThanh;
    public TiepNhanHoSoTrucTuyenEventHandler(ISMSService sMSService, IInjectConfiguration injectConfiguration, IDapperRepository dapperRepository, IJobService jobService, IReadRepository<Config> readRepositoryConfig, IMailService mailService)
    {
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _readRepositoryConfig = readRepositoryConfig;
        _mailService = mailService;
        _sMSService = sMSService;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        tinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");


    }
    public async Task Handle(EventNotification<TiepNhanHoSoTrucTuyenEvent> notification, CancellationToken cancellationToken)
    {
        HoSo hoSo = notification.Event.Entity;
        TiepNhanHoSoTrucTuyenEvent Event = notification.Event;
        string linkTraCuu = HoSoEventUtils.GetLinkTraCuu(domainName, hoSo.MaHoSo ?? string.Empty, hoSo.SoGiayToNguoiUyQuyen ?? hoSo.SoGiayToChuHoSo ?? string.Empty);
        /* var dataSdtNguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.NguoiTiepNhan>(HoSoEventUtils.sqlPhoneNumberNguoiTiepNhan, new
         {
             MaHoSo = hoSo.MaHoSo
         });*/
        string sqlPhoneNumberHoTroEmailTrucTuyen = @$"SELECT SoDienThoai FROM Catalog.Groups WHERE GroupName = @TenDonVi";
        var dataSdtHoTro = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoEventUtils.SoDienThoaiHoTroTrucTuyen>(sqlPhoneNumberHoTroEmailTrucTuyen, new
        {
            TenDonVi = Event.TenDonVi
        }); ;
        string linkThanhToan = HoSoEventUtils.GetLinkThanhToan(domainName, hoSo.MaHoSo);
        if (hoSo.ThongBaoEmail == true && (!string.IsNullOrEmpty(hoSo.EmailNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.EmailChuHoSo)) && hoSo.LoaiDuLieuKetNoi != "TBKM" && hoSo.LoaiDuLieuKetNoi != "TBKMBS")
        {
            if (Event.KhongCoNgayHenTra == true)
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCodeKhongNgayHenTra), cancellationToken);
                if (config != null)
                {
                    Mapper mapper = new Mapper();
                    mapper.Config.Default.MapToConstructor(true);
                    TiepNhanHoSoTrucTuyenKhongNgayHenTraEmailMapper hoSoEmailMapper = mapper.Map<TiepNhanHoSoTrucTuyenKhongNgayHenTraEmailMapper>(hoSo);
                    hoSoEmailMapper.GioNhan = Event.GioNhan;
                    hoSoEmailMapper.NgayNhan = Event.NgayNhan;
                    hoSoEmailMapper.NgayGioHenTra = Event.NgayGioHenTra;
                    hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                    hoSoEmailMapper.ThoiHanXuLy = Event.ThoiHanXuLy;
                    hoSoEmailMapper.HoTenChuHoSo = Event.HoTenChuHoSo;
                    hoSoEmailMapper.TenNguoiNhanHoSo = Event.TenNguoiNhanHoSo;
                    hoSoEmailMapper.TenDiaDanh = HoSoEventUtils.GetTenDiaDanh(Event.TenDonVi, Event.GroupCatalog, tinhThanh);
                    hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                    hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                    hoSoEmailMapper.LinkTraCuu = linkTraCuu;
                    hoSoEmailMapper.DangKyNhanKetQuaTai = Event.DangKyNhanKetQuaTai;
                    hoSoEmailMapper.LinkThanhToan = linkThanhToan;
                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdtHoTro.SoDienThoai;
                    /*                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdtNguoiTiepNhan.PhoneNumber
                    */
                    hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, "Thông báo tiếp nhận hồ sơ trực tuyến ", hoSo.MaHoSo, formattedContent);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
                }
            }
            else if (Event.KhongCoNgayHenTra == null || Event.KhongCoNgayHenTra == false)
            {
                Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCode), cancellationToken);
                if (config != null)
                {

                    Mapper mapper = new Mapper();
                    mapper.Config.Default.MapToConstructor(true);
                    TiepNhanHoSoTrucTuyenEmailMapper hoSoEmailMapper = mapper.Map<TiepNhanHoSoTrucTuyenEmailMapper>(hoSo);
                    hoSoEmailMapper.GioNhan = Event.GioNhan;
                    hoSoEmailMapper.NgayNhan = Event.NgayNhan;
                    hoSoEmailMapper.NgayGioHenTra = Event.NgayGioHenTra;
                    hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                    hoSoEmailMapper.ThoiHanXuLy = Event.ThoiHanXuLy;
                    hoSoEmailMapper.HoTenChuHoSo = Event.HoTenChuHoSo;
                    hoSoEmailMapper.TenNguoiNhanHoSo = Event.TenNguoiNhanHoSo;
                    hoSoEmailMapper.TenDiaDanh = Event.TenDiaDanh;
                    hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                    hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                    hoSoEmailMapper.SoDienThoaiHoTro = dataSdtHoTro.SoDienThoai;
                    hoSoEmailMapper.LinkTraCuu = linkTraCuu;
                    hoSoEmailMapper.LinkThanhToan = linkThanhToan;
                    hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                    var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                    MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, "Thông báo việc tiếp nhận hồ sơ và hẹn trả kết quả", hoSo.MaHoSo, formattedContent);
                    _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
                }
            }
        }
        if (hoSo.ThongBaoSMS == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
        {
            SMSRequest sMSRequest = new SMSRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, string.Empty, hoSo.MaHoSo, hoSo.DonViId);
            //_jobService.Enqueue<ISMSService>(x => x.SendAsync(sMSRequest, cancellationToken));
            await _sMSService.SendJobWrapperAsync(sMSRequest, nameof(SMSSettingNoiDungTinNhan.TiepNhan), hoSo, cancellationToken);
        }

        try
        {
            if (hoSo.ThongBaoZalo == true && (!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                string loiNhan = $"Hồ sơ của ông bà đã được tiếp nhận trực tuyến thành công. Cơ quan tiếp nhận xử lý {Event.TenDonVi}, thời gian tiếp nhận {hoSo.NgayTiepNhan?.ToString("dd/MM/yyyy")}, thời gian hẹn trả {hoSo.NgayHenTra?.ToString("dd/MM/yyyy")}";
                SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                    null,
                    hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                    hoSo.TrichYeuHoSo,
                    hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                    hoSo.MaHoSo,
                    "Tiếp nhận thành công",
                    hoSo.TrichYeuHoSo,
                    loiNhan,
                    HoSoEventUtils.GetLinkTraCuu("", hoSo.MaHoSo, hoSo.SoGiayToNguoiUyQuyen ?? hoSo.SoGiayToChuHoSo ?? string.Empty),
                    null,
                    "Xem Giấy tiếp nhận");
                ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
                _jobService.Enqueue<IZaloService>(x => x.SendTemplateOrTextAsync(zaloRequest, sendTemplateZalo, cancellationToken));
            }
        }
        catch (Exception ex)
        {

        }

        if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
        {
            _jobService.Enqueue<ISyncDVCQGService>(x => x.DongBoDVCQG(hoSo));
            Config? config = await _readRepositoryConfig.GetBySpecAsync(new GetByCodeSpec(mailConfigCodeTBKM), cancellationToken);
            if (config != null)
            {

                Mapper mapper = new Mapper();
                mapper.Config.Default.MapToConstructor(true);
                ThongBaoKhuyenMaiEmailMapper hoSoEmailMapper = mapper.Map<ThongBaoKhuyenMaiEmailMapper>(hoSo);
                hoSoEmailMapper.GioNhan = Event.GioNhan;
                hoSoEmailMapper.NgayNhan = Event.NgayNhan;
                hoSoEmailMapper.NgayGioHenTra = Event.NgayGioHenTra;
                hoSoEmailMapper.NgayThangNam = Event.NgayThangNam;
                hoSoEmailMapper.ThoiHanXuLy = Event.ThoiHanXuLy;
                hoSoEmailMapper.HoTenChuHoSo = Event.HoTenChuHoSo;
                hoSoEmailMapper.TenNguoiNhanHoSo = Event.TenNguoiNhanHoSo;
                hoSoEmailMapper.TenDiaDanh = Event.TenDiaDanh;
                hoSoEmailMapper.TenDonVi = Event.TenDonVi;
                hoSoEmailMapper.TenDonViCha = Event.TenDonViCha;
                hoSoEmailMapper.BoPhanTiepNhanVaTraKetQua = Event.BoPhanTiepNhanVaTraKetQua;
                var formattedContent = _mailService.FormatContentWithEntity(hoSoEmailMapper, config.Content);
                MailRequest mailRequest = new MailRequest(new List<string>() { hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo }, "Thông báo việc tiếp nhận hồ sơ và hẹn trả kết quả", hoSo.MaHoSo, formattedContent);
                _jobService.Enqueue<IMailService>(x => x.SendAsync(mailRequest, cancellationToken));
            }
        }
        _jobService.Enqueue<IEMCService>(x => x.SendAction(new EMCRequestBody()
        {
            CodeProfile = hoSo.MaHoSo,
            CodeTTHC = hoSo.MaTTHC,
            NameTTHC = Event.TenTTHC ?? "",
            Status = hoSo.TrangThaiHoSoId,
            FormsReception = hoSo.KenhThucHien,
            Level = hoSo.MucDo,
            MaHoSo = hoSo.MaHoSo,
            IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo
        }));
        _jobService.Enqueue<IFirebaseNotification>(x => x.Handle(Event.IdCongDan, new Catalog.NotificationApp.Commands.CreateFirebaseNotificationCommand()
        {
            HoSoId = hoSo.Id,
            Content = "Cán bộ " + Event.TenNguoiNhanHoSo + " Đã tiếp nhận hồ sơ của ông/bà với mã hồ sơ: " + hoSo.MaHoSo,
            CreatedOn = DateTime.Now,
            Description = "",
            IsRead = false,
            MaHoSo = hoSo.MaHoSo,
            Title = $"Tiếp nhận trực tuyến thành công",
            Topic = Event.IdCongDan,
            LoaiThongBao = NotificationLoaiThongBao.CongDan,
            Type = NotificationType.TiepNhanTrucTuyen
        }, hoSo.Id, CancellationToken.None));
    }
}
