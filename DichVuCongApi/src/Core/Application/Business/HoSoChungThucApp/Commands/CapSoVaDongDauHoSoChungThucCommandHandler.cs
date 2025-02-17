using MediatR;
using System.Net.WebSockets;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
public class CapSoVaDongDauHoSoChungThucCommandHandler : ICommandHandler<CapSoVaDongDauHoSoChungThucCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IHoSoServices _hoSoServices;
    private readonly ILogger<HoSo> _logger;
    private readonly IEMCService _eMCService;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly IRepository<HoSoChungThuc> _repositoryHoSoChungThuc;
    private readonly IRepository<SoChungThuc> _repositorySoChungThuc;
    private readonly IJobService _jobService;
    private readonly bool usingZaloTemplate = false;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IMinioService _minioService;
    private int soGioMacDinhBuocXuLy = 2;
    private readonly IEventPublisher _eventPublisher;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    public CapSoVaDongDauHoSoChungThucCommandHandler(
        IEventPublisher eventPublisher,
        ISyncDVCQGService syncDVCQGService,
        ILogger<HoSo> logger,
        IDapperRepository dapperRepository,
        IUserService user,
        IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IRepository<NgayNghi> repositoryNgayNghi,
        IRepositoryWithEvents<HoSo> repositoryHoSo,
        IHoSoServices hoSoServices,
        IEMCService eMCService,
        IInjectConfiguration configuration,
        IJobService jobService,
        IRepository<HoSoChungThuc> repositoryHoSoChungThuc,
        IRepository<SoChungThuc> repositorySoChungThuc,
        IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        IMinioService minioService,
        INguoiXuLyHoSoService nguoiXuLyHoSoService
        )
    {
        _dapperRepository = dapperRepository;
        _user = user;
        _eventPublisher = eventPublisher;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _repositoryHoSo = repositoryHoSo;
        _hoSoServices = hoSoServices;
        _logger = logger;
        _eMCService = eMCService;
        _syncDVCQGService = syncDVCQGService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _jobService = jobService;
        _repositoryHoSoChungThuc = repositoryHoSoChungThuc;
        _repositorySoChungThuc = repositorySoChungThuc;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _minioService = minioService;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    private async Task PostHandle(CapSoVaDongDauHoSoChungThucCommand request, List<ThanhPhanHoSo> currentThanhPhanHoSos)
    {
        if (currentThanhPhanHoSos.Any(x => x.TrangThaiDuyet == ThanhPhanHoSoConstant.TrangThaiDuyet_ChuaKy))
        {
            throw new Exception("Có thành phần hồ sơ có trạng thái duyệt là chưa ký");
        }
        //string sql = @"SELECT tphs.KyDienTuBanGiay, tphs.SoTrang, tphs.SoBanGiay, tphs.SoChungThucGiay, tphs.SoChungThucG, tphs.TrangThaiDuyet, tphs.SoChungThucDienTu, tphs.SoChungThucDT, 
        //                FROM Business.ThanhPhanHoSos tphs LEFT JOIN SoChungThuc sctg on tphs.SoChungThucG = sctg.Id LEFT JOIN SoChungThuc sctdt on tphs.SoChungThucDT = sctdt.Id";
        var currentThanhPhanHoSoDaDuyets = currentThanhPhanHoSos.Where(x => x.TrangThaiDuyet == ThanhPhanHoSoConstant.TrangThaiDuyet_DaKy).ToList();
        for (int i = 0; i < currentThanhPhanHoSoDaDuyets.Count; i++)
        {
            ThanhPhanHoSo thanhPhanHoSo = currentThanhPhanHoSoDaDuyets[i];
            // thành phần hồ sơ này người dùng yêu cầu ký điện tử mà thông tin cập nhật lại chưa ký => trả về lại cho chuyên viên ký.
            if (thanhPhanHoSo.KyDienTuBanGiay == true && string.IsNullOrEmpty(thanhPhanHoSo.TrangThaiDuyet))
            {
                throw new Exception("Có thành phần hồ sơ có trạng thái duyệt là chưa ký");
            }
            else if (thanhPhanHoSo.KyDienTuBanGiay == true && thanhPhanHoSo.TrangThaiDuyet == ThanhPhanHoSoConstant.TrangThaiDuyet_DaKy)
            {
                var currDinhKemReq = thanhPhanHoSo.DinhKem.Split("##");
                var data = await _minioService.VerifyPdfSignatureITextSharp(currDinhKemReq);
                if (data.DigitalSignatureFiles.Count != currDinhKemReq.Length) // số lượng file ký số ở các tệp gửi lên chưa được ký hết.
                {
                    throw new Exception("Có tệp đính kèm chưa được ký số");
                }
            }
            if (thanhPhanHoSo.KyDienTuBanGiay == true && (thanhPhanHoSo.SoChungThucDT == null || thanhPhanHoSo.SoChungThucDT == default) && thanhPhanHoSo.SoChungThucDienTu != null)
            {
                throw new Exception("Có thành phần hồ sơ bản điện tử chưa có sổ điển tử ");
            }
            if (thanhPhanHoSo.SoBanGiay > 0  && (thanhPhanHoSo.SoChungThucG == null || thanhPhanHoSo.SoChungThucG == default) && thanhPhanHoSo.SoChungThucGiay != null)
            {
                throw new Exception("Có thành phần hồ sơ bản giấy chưa có sổ giấy ");
            }
           
        }
    }

    private async Task InsertHoSoChungThuc(List<ThanhPhanHoSo> thanhPhanHoSos, IReadOnlyList<CapSoVaDongDau_ThanhPhanHoSo> reqThanhPhanHoSos, HoSoQLVB hoSo, DateTime currentTime, UserDetailsDto user, CancellationToken cancellationToken)
    {
        var hoSoChungThucs = new List<HoSoChungThuc>();
        var updateThanhPhanHoSos = new List<ThanhPhanHoSo>();

        for (int i = 0; i < thanhPhanHoSos.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanHoSos[i];
            var reqThanhPhanHoSo = reqThanhPhanHoSos[i];
            if (thanhPhanHoSo.SoChungThucG != null && thanhPhanHoSo.SoChungThucGiay != null)
            {
                var hoSoChungThuc = new HoSoChungThuc(hoSo.MaHoSo, thanhPhanHoSo.SoChungThucG.ToString(), (int)thanhPhanHoSo.SoChungThucGiay, thanhPhanHoSo.MaGiayTo ?? "", currentTime, reqThanhPhanHoSo.DinhKem, thanhPhanHoSo.Id);
                thanhPhanHoSo.UpdateThanhPhanChungThucCapSoVaDongDau(null, null, null, null, null, reqThanhPhanHoSo.DinhKem, null);
                hoSoChungThucs.Add(hoSoChungThuc);
                updateThanhPhanHoSos.Add(thanhPhanHoSo);
            }
            if (thanhPhanHoSo.SoChungThucDT != null && thanhPhanHoSo.SoChungThucDienTu != null)
            {
                var hoSoChungThuc = new HoSoChungThuc(hoSo.MaHoSo, thanhPhanHoSo.SoChungThucDT.ToString(), (int)thanhPhanHoSo.SoChungThucDienTu, thanhPhanHoSo.MaGiayTo ?? "", currentTime, reqThanhPhanHoSo.DinhKem, thanhPhanHoSo.Id);
                thanhPhanHoSo.UpdateThanhPhanChungThucCapSoVaDongDau(null, null, null, null, null, reqThanhPhanHoSo.DinhKem, null);
                hoSoChungThucs.Add(hoSoChungThuc);
                updateThanhPhanHoSos.Add(thanhPhanHoSo);
            }
        }
        await _repositoryThanhPhanHoSo.UpdateRangeAsync(updateThanhPhanHoSos, cancellationToken);
        await _repositoryHoSoChungThuc.AddRangeAsync(hoSoChungThucs, cancellationToken);

    }

    public async Task<Result> Handle(CapSoVaDongDauHoSoChungThucCommand request, CancellationToken cancellationToken)
    {
        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlTruongHopThuTuc = "SELECT NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var ids = request.ThanhPhanHoSos.Select(x => x.Id).ToList();
        var currentThanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GetThanhPhanHoSoChungThucSpec(ids));
        try
        {
            await PostHandle(request, currentThanhPhanHoSos);
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        if(hoSo.LaHoSoChungThuc == false || hoSo.LaHoSoChungThuc == null)
        {
            return (Result)Result.Fail("Loại hồ sơ không phải hồ sơ chứng thực");
        }
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
        {
            hoSo.MaTruongHop
        });
        var maTrangThaiCu = hoSo.TrangThaiHoSoId;
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
        
        try
        {
                
            var updateHoSoData = await _hoSoServices.ChuyenBuoc(currentTime, truongHopThuTuc, hoSo, request.BuocHienTai, ngayNghis, soGioMacDinhBuocXuLy, currentUser, request.DinhKemKetQua, request.TrichYeuKetQua, request.NguoiXuLyTiep, null);

            hoSo.ChuyenBuocXuLy(updateHoSoData.TenBuoc, updateHoSoData.MaNodeSau, null, updateHoSoData.BuocXuLyTiep, currentUser.Id.ToString(), hoSo.BuocHienTai, currentUser.Id.ToString(), request.NguoiXuLyTiep,
                request.TrichYeuKetQua, request.DinhKemKetQua, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy, updateHoSoData.MaTrangThai, currentTime, updateHoSoData.NgayHenTraCaNhan, updateHoSoData.NgayYeuCauBoSung, updateHoSoData.NgayHenTra, updateHoSoData.NgayTraKetQua, updateHoSoData.TrangThaiTraKq, updateHoSoData.DonViTraKq, null, null, null, null, null, null, currentUser.OfficeCode, currentTime, null);
            var dinhKemKetQua = string.Join("##", request.ThanhPhanHoSos.Select(x => x.DinhKem));
            hoSo.SetDinhKemKetQua(dinhKemKetQua);
            hoSo.CapNhatHoSoTheoCauHinhNode(updateHoSoData.loaiDuLieuKetNoi, updateHoSoData.trangThaiChiTiet);
            await _repositoryHoSo.UpdateAsync(hoSo, cancellationToken);
            await _nguoiXuLyHoSoService.UpdateAndRemoveOtherHandlers(hoSo.Id, request.NguoiXuLyTiep, cancellationToken);

            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, updateHoSoData.BuocXuLyTiep, (double)updateHoSoData.ThoiHanBuocXuLy, updateHoSoData.LoaiThoiHanBuocXuLy, updateHoSoData.NgayHenTraCaNhanCu, currentUser.Id.ToString(), currentUser.FullName, request.NguoiXuLyTiep, "", currentTime, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy, updateHoSoData.TenThaoTac ?? "", updateHoSoData.MaTrangThai);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            await InsertHoSoChungThuc(currentThanhPhanHoSos, request.ThanhPhanHoSos, hoSo, currentTime, currentUser, cancellationToken);
                
            await _eventPublisher.PublishAsync(new ChuyenBuocNotificationEvent(hoSo, request.NguoiXuLyTiep, currentUser.FullName + " " + updateHoSoData.TenThaoTac + " " + hoSo.MaHoSo, updateHoSoData.NotificationType, updateHoSoData.MaTrangThai, updateHoSoData.TrangThaiTraKq));
                
            //transactionScope.Complete();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            throw new Exception(ex.ToString());

        }
        
        if (hoSo.TrangThaiTraKq == _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ)
        {
            await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog));
        }
        await _eMCService.SendAction(new EMCRequestBody()
        {
            CodeProfile = hoSo.MaHoSo,
            CodeTTHC = hoSo.MaTTHC,
            NameTTHC = hoSo.TenTTHC,
            Status = hoSo.TrangThaiHoSoId,
            FormsReception = hoSo.KenhThucHien,
            Level = hoSo.MucDo,
            MaHoSo = hoSo.MaHoSo,
            IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
            IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSo.SoGiayToChuHoSo,
        });
        return (Result)Result.Success();

    }
}
