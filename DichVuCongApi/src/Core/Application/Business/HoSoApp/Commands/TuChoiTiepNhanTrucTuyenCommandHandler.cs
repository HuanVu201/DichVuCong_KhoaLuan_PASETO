using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TuChoiTiepNhanTrucTuyenCommandHandler : ICommandHandler<TuChoiTiepNhanTucTuyenCommand>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IJobService _jobService;
    private readonly IUserService _user;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly bool usingZaloTemplate = false;
    private readonly IZaloService _zaloService;
    private readonly IEventPublisher _eventPublisher;
    private readonly IDapperRepository _dapperRepository;
    private readonly string tenTinhThanh;
    private readonly IKhaiSinhKhaiTuService _khaiSinhKhaiTuService;
    private readonly ILLTPService _lLTPService;
    private readonly string domainName;



    public TuChoiTiepNhanTrucTuyenCommandHandler(ILLTPService lLTPService, IKhaiSinhKhaiTuService khaiSinhKhaiTuService, IInjectConfiguration injectConfiguration, IDapperRepository dapperRepository, IEventPublisher eventPublisher, IInjectConfiguration configuration, ISyncDVCQGService syncDVCQGService, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IUserService user, IJobService jobService, IZaloService zaloService)
    {
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _user = user;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_NAME");
        _jobService = jobService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _syncDVCQGService = syncDVCQGService;
        _zaloService = zaloService;
        _eventPublisher = eventPublisher;
        _dapperRepository = dapperRepository;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
        _khaiSinhKhaiTuService = khaiSinhKhaiTuService;
        _lLTPService = lLTPService;
    }

    private void SendZalo(HoSoQLVB hoSo, CancellationToken cancellationToken, string? lyDoTuChoi, string? dinhKemTuChoi)
    {
        try
        {
            if ((!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                string linkGetFilePublic = HoSoEventUtils.GetLinkPublicFileTuChoiTiepNhanHoSo(domainName, dinhKemTuChoi);
                string loiNhan = $"Hồ sơ của ông bà không đủ điều kiện tiếp nhận do {lyDoTuChoi}";
                if (usingZaloTemplate)
                {
                    SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                        null,
                        hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                        hoSo.TrichYeuHoSo,
                        hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                        hoSo.MaHoSo,
                    "Từ chối tiếp nhận",
                        hoSo.TrichYeuHoSo,
                        loiNhan,
                        linkGetFilePublic,
                    null,
                        "Xem File Đính kèm từ chối");
                    _jobService.Enqueue<IZaloService>(x => x.SendTemplateAsync(sendTemplateZalo, cancellationToken));
                }
                else
                {
                    ZaloRequest zaloRequest = new ZaloRequest(hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo, loiNhan, hoSo.MaHoSo);
                    _jobService.Enqueue<IZaloService>(x => x.SendTextAsync(zaloRequest, cancellationToken));
                }
            }
        }
        catch (Exception ex)
        {

        }
    }
    public async Task<Result> Handle(TuChoiTiepNhanTucTuyenCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        if(hoSo.TrangThaiHoSoId == "1")
        {
           
            try
            {
                var updatedHoSo = hoSo.TuChoiTiepNhanHoSoTrucTuyen("3", currentTime, request.LyDoTuChoi, request.DinhKemTuChoi, user.Id.ToString());
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);

                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, user.Id.ToString(), user.FullName, "", "", currentTime, request.LyDoTuChoi, request.DinhKemTuChoi, thaoTac: "Từ chối tiếp nhận hồ sơ", trangThai: "3");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
               
                await _khaiSinhKhaiTuService.AddTrangThaiDVCLT(hoSo.MaHoSo, "6", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
                await _lLTPService.AddTrangThaiDVCLT(hoSo.MaHoSo, "3", TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            await _eventPublisher.PublishAsync(new TuChoiTiepNhanTrucTuyenEvent(hoSo, user.FullName, user.OfficeName, request.LyDoTuChoi, user.OfficeName, hoSo.Catalog, tenTinhThanh, hoSo.SoDienThoai));
            SendZalo(hoSo, cancellationToken, request.LyDoTuChoi,request.DinhKemTuChoi);
            return (Result)Result.Success();
        }
        else
        {
            return (Result)Result.Fail("Hồ sơ không ở trạng thái chờ tiếp nhận");
        }
        
    }
}
