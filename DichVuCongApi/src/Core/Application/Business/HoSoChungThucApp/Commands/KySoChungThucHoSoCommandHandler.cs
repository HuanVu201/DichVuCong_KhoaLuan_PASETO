using System.Transactions;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
public class KySoChungThucHoSoCommandHandler : ICommandHandler<KySoChungThucHoSoCommand>
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
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IMinioService _minioService;
    private readonly bool usingZaloTemplate = false;
    private readonly IRepository<SoChungThuc> _repositorySoChungThuc;
    private int soGioMacDinhBuocXuLy = 2;
    private readonly IEventPublisher _eventPublisher;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public KySoChungThucHoSoCommandHandler(
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
        IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        IMinioService minioService,
        IRepository<SoChungThuc> repositorySoChungThuc,
        INguoiXuLyHoSoService nguoiXuLyHoSoService
        )
    {
        _eventPublisher = eventPublisher;
        _dapperRepository = dapperRepository;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _repositoryHoSo = repositoryHoSo;
        _hoSoServices = hoSoServices;
        _logger = logger;
        _eMCService = eMCService;
        _syncDVCQGService = syncDVCQGService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _minioService = minioService;
        _repositorySoChungThuc = repositorySoChungThuc;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    private async Task<IReadOnlyList<SoChungThuc>> GetSoChungThucs(string donVi)
    {
        var request = new SearchSoChungThucQuery()
        {
            RequestTime = DateTime.Now,
            PageNumber = 1,
            PageSize = 4,
            TrangThai = true,
            Removed = false,
            DonVi = donVi,
            SearchByOpening = true,
        };
        var where = SearchSoChungThucQueryWhereBuilder.Build(request);
        var currOpenSoChungThuc = await _dapperRepository.QueryAsync<SoChungThuc>($@"SELECT Id,DonVi,TenSo,SoBatDau,SoHienTai,NgayBatDau,NgayDongSo,TrangThai,Loai FROM Catalog.SoChungThucs sct {where}", request);
        return currOpenSoChungThuc;
    }
    private async Task PostHandle(KySoChungThucHoSoCommand request, List<ThanhPhanHoSo>? currentThanhPhanHoSos)
    {
        var ids = request.ThanhPhanHoSos.Select(x => x.Id).ToList();
        //var currentThanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GetThanhPhanHoSoChungThucSpec(ids));
        for (int i = 0; i < currentThanhPhanHoSos.Count; i++)
        {
            ThanhPhanHoSo thanhPhanHoSo = currentThanhPhanHoSos[i];
            KySoChungThuc_ThanhPhanHoSo? thanhPhanHoSoReq = request.ThanhPhanHoSos.FirstOrDefault(x => x.Id == thanhPhanHoSo.Id);
            if (thanhPhanHoSoReq == null) continue;
            // thành phần hồ sơ này người dùng yêu cầu ký điện tử mà thông tin cập nhật lại chưa ký => trả về lại cho chuyên viên ký.
            if(thanhPhanHoSo.KyDienTuBanGiay == true && string.IsNullOrEmpty(thanhPhanHoSoReq.TrangThaiDuyet))
            {
                throw new Exception("Có thành phần hồ sơ chưa ký số");
            } else if(thanhPhanHoSo.KyDienTuBanGiay == true && thanhPhanHoSoReq.TrangThaiDuyet == ThanhPhanHoSoConstant.TrangThaiDuyet_DaKy)
            {
                if (string.IsNullOrEmpty(thanhPhanHoSoReq.DinhKem))
                {
                    throw new Exception("Vui lòng đính kèm tệp vào thành phần hồ sơ chứng thực");
                }
                var currDinhKemReq = thanhPhanHoSoReq.DinhKem.Split("##");
                var data = await _minioService.VerifyPdfSignatureITextSharp(currDinhKemReq);
                if(data.DigitalSignatureFiles.Count != currDinhKemReq.Length) // số lượng file ký số ở các tệp gửi lên chưa được ký hết.
                {
                    throw new Exception("Có thành phần hồ sơ yêu cầu chứng thực điện tử chưa được ký số");
                }
            }
        }
    }
    public async Task<Result> Handle(KySoChungThucHoSoCommand request, CancellationToken cancellationToken)
    {
        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlTruongHopThuTuc = "SELECT NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var thanhPhanHoSoIds = request.ThanhPhanHoSos.Select(x => x.Id).ToList<Guid>();
        var thanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GetThanhPhanHoSoChungThucSpec(thanhPhanHoSoIds));

        try
        {
            await PostHandle(request, thanhPhanHoSos);
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
        if (hoSo.LaHoSoChungThuc == false || hoSo.LaHoSoChungThuc == null)
        {
            return (Result)Result.Fail("Loại hồ sơ không phải hồ sơ chứng thực");
        }
       
        try
        {
            #region Cấp số tự động
            if (request.ThanhPhanHoSos.Any(x => x.TrangThaiDuyet == ThanhPhanHoSoConstant.TrangThaiDuyet_ChuaKy))
            {
                return (Result)Result.Fail("Vui lòng ký số trên từng thành phần hồ sơ.");
            }
            var soChungThucs = await GetSoChungThucs(currentUser.OfficeCode);
            var soChungThucDT = soChungThucs.FirstOrDefault(x => x.Loai == SoChungThucConstant.Loai_DienTu);
            var soChungThucG = soChungThucs.FirstOrDefault(x => x.Loai == SoChungThucConstant.Loai_Giay);
            var hasOpen2SoChungThucGiay = soChungThucs.Where(x => x.Loai == SoChungThucConstant.Loai_Giay).ToList();
            var hasOpen2SoChungThucDienTu = soChungThucs.Where(x => x.Loai == SoChungThucConstant.Loai_DienTu).ToList();
            if (soChungThucDT == null && soChungThucG == null)
            {
                return (Result)Result.Fail("Đơn vị chưa cấu hình sổ chứng thực giấy/điện tử hoặc sổ đang bị đóng.");
            }
            if (soChungThucDT == null)
            {
                return (Result)Result.Fail("Đơn vị chưa cấu hình sổ chứng thực điện tử hoặc sổ đang bị đóng.");
            }
            if (soChungThucG == null)
            {
                return (Result)Result.Fail("Đơn vị chưa cấu hình sổ chứng thực giấy hoặc sổ đang bị đóng.");
            }
            if (hasOpen2SoChungThucGiay.Count > 1)
            {
                return (Result)Result.Fail("Có nhiều hơn một sổ chứng thực giấy đang mở.");
            }
            if (hasOpen2SoChungThucDienTu.Count > 1)
            {
                return (Result)Result.Fail("Có nhiều hơn một sổ chứng thực điện tử đang mở.");
            }

            int currSoChungThucDT = soChungThucDT.SoHienTai;
            int currSoChungThucG = soChungThucG.SoHienTai;
            var newThanhPhanHoSos = new List<ThanhPhanHoSo>();
            for (int i = 0; i < thanhPhanHoSos.Count; i++)
            {
                var thanhPhanHoSo = thanhPhanHoSos[i];
                var reqThanhPhanHoSo = request.ThanhPhanHoSos.FirstOrDefault(x => x.Id == thanhPhanHoSo.Id);

                if (reqThanhPhanHoSo.TrangThaiDuyet == ThanhPhanHoSoConstant.TrangThaiDuyet_ChuaKy)
                {
                    return (Result)Result.Fail("Có thành phần có trạng thái chưa duyệt, xin vui lòng thử lại");
                }
                if (thanhPhanHoSo.SoChungThucDT != null && thanhPhanHoSo.KyDienTuBanGiay == true)
                {
                    //return (Result)Result.Fail("Đã có số chứng thực điện tử");
                    continue;
                }
                if (thanhPhanHoSo.SoBanGiay > 0 && thanhPhanHoSo.KyDienTuBanGiay == false && thanhPhanHoSo.SoChungThucG != null)
                {
                    //return (Result)Result.Fail("Đã có số chứng thực giấy");
                    continue;
                }
                if (thanhPhanHoSo.SoChungThucDT == null && thanhPhanHoSo.KyDienTuBanGiay == true && soChungThucDT == null)
                {
                    return (Result)Result.Fail("Sổ chứng thực điện tử đang trong trạng thái đóng hoặc chưa tạo");
                }
                if (thanhPhanHoSo.SoChungThucG == null && thanhPhanHoSo.SoBanGiay > 0 && soChungThucG == null)
                {
                    return (Result)Result.Fail("Sổ chứng thực giấy đang trong trạng thái đóng hoặc chưa tạo");
                }

                    if (currSoChungThucDT > 0 && soChungThucDT.Id != default && thanhPhanHoSo.KyDienTuBanGiay == true)// thành phần hồ sơ với sổ chứng thực điện tử
                    {
                        var updatedTPHS = thanhPhanHoSo.UpdateThanhPhanChungThucCapSoVaDongDau(ThanhPhanHoSoConstant.TrangThaiDuyet_DaKy, soChungThucDT.Id, currSoChungThucDT, null, null, reqThanhPhanHoSo.DinhKem, currentUser.Id);
                        newThanhPhanHoSos.Add(updatedTPHS);
                        currSoChungThucDT += 1;
                    }
                    if (currSoChungThucG > 0 && soChungThucG.Id != default && thanhPhanHoSo.SoBanGiay > 0)// thành phần hồ sơ với sổ chứng thực giấy
                    {
                        var updatedTPHS = thanhPhanHoSo.UpdateThanhPhanChungThucCapSoVaDongDau(ThanhPhanHoSoConstant.TrangThaiDuyet_DaKy, null, null, soChungThucG.Id, currSoChungThucG, reqThanhPhanHoSo.DinhKem, currentUser.Id);
                        newThanhPhanHoSos.Add(updatedTPHS);
                        currSoChungThucG += 1;
                    }
                    if(currSoChungThucDT > 0 || currSoChungThucG > 0) // bị trả lại và chuyển lại(chỉ cập nhật đính kèm)
                    {
                        var updatedTPHS = thanhPhanHoSo.SetDinhKem(reqThanhPhanHoSo.DinhKem);
                        newThanhPhanHoSos.Add(updatedTPHS);
                    }
                }

            await _repositoryThanhPhanHoSo.UpdateRangeAsync(newThanhPhanHoSos, cancellationToken);
            if (currSoChungThucDT != -1 && soChungThucDT.SoHienTai != currSoChungThucDT)
            {
                soChungThucDT.Update(null, null, null, currSoChungThucDT, null, null, null, null);
                await _repositorySoChungThuc.UpdateAsync(soChungThucDT);
            }
            if (currSoChungThucG != -1 && soChungThucG.SoHienTai != currSoChungThucG)
            {
                soChungThucG.Update(null, null, null, currSoChungThucG, null, null, null, null);
                await _repositorySoChungThuc.UpdateAsync(soChungThucG);
            }
            #endregion

            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
            {
                hoSo.MaTruongHop
            });
            var maTrangThaiCu = hoSo.TrangThaiHoSoId;
            var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
            var updateHoSoData = await _hoSoServices.ChuyenBuoc(currentTime, truongHopThuTuc, hoSo, request.BuocHienTai, ngayNghis, soGioMacDinhBuocXuLy, currentUser, request.DinhKemKetQua, request.TrichYeuKetQua, request.NguoiXuLyTiep, null);

                hoSo.ChuyenBuocXuLy(updateHoSoData.TenBuoc, updateHoSoData.MaNodeSau, null, updateHoSoData.BuocXuLyTiep, currentUser.Id.ToString(), hoSo.BuocHienTai, currentUser.Id.ToString(), request.NguoiXuLyTiep,
                   request.TrichYeuKetQua, request.DinhKemKetQua, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy, updateHoSoData.MaTrangThai, currentTime, updateHoSoData.NgayHenTraCaNhan, updateHoSoData.NgayYeuCauBoSung, updateHoSoData.NgayHenTra, updateHoSoData.NgayTraKetQua, updateHoSoData.TrangThaiTraKq, updateHoSoData.DonViTraKq, null, null, null, null, null, null, currentUser.OfficeCode, currentTime, null);
                hoSo.CapNhatHoSoTheoCauHinhNode(updateHoSoData.loaiDuLieuKetNoi, updateHoSoData.trangThaiChiTiet);

            await _repositoryHoSo.UpdateAsync(hoSo, cancellationToken);

            await _nguoiXuLyHoSoService.UpdateAndRemoveOtherHandlers(hoSo.Id, request.NguoiXuLyTiep, cancellationToken);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, updateHoSoData.BuocXuLyTiep, (double)updateHoSoData.ThoiHanBuocXuLy, updateHoSoData.LoaiThoiHanBuocXuLy, updateHoSoData.NgayHenTraCaNhanCu, currentUser.Id.ToString(), currentUser.FullName, request.NguoiXuLyTiep, "", currentTime, request.YKienNguoiChuyenXuLy, request.DinhKemYKienNguoiChuyenXuLy, updateHoSoData.TenThaoTac ?? "", updateHoSoData.MaTrangThai);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);

            await _eventPublisher.PublishAsync(new ChuyenBuocNotificationEvent(hoSo, request.NguoiXuLyTiep, currentUser.FullName + " " + updateHoSoData.TenThaoTac + " " + hoSo.MaHoSo, updateHoSoData.NotificationType, updateHoSoData.MaTrangThai, updateHoSoData.TrangThaiTraKq));

                
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
        if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
        {
            await _syncDVCQGService.DongBoDVCQG(hoSo);
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
