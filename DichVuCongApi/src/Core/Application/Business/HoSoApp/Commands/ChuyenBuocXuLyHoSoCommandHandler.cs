using Newtonsoft.Json;
using System.Data;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.LTQVLB;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenBuocXuLyHoSoCommandHandler : ICommandHandler<ChuyenBuocXuLyHoSoCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IHoSoServices _hoSoServices;
    private readonly ILogger<HoSo> _logger;
    private readonly IEMCService _eMCService;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly IZaloService _zaloService;
    private readonly IJobService _jobService;
    private readonly bool usingZaloTemplate = false;
    private float soGioMacDinhBuocXuLy = 2;
    private readonly IRepository<KetQuaLienQuan> _repositoryKetQuaLienQuan;
    private readonly IEventPublisher _eventPublisher;
    private readonly IMinioService _minioService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    private readonly bool _batBuocDinhKemTPHS = false;
    private readonly LTQLVBSettings? _ltqlvbSettings;

    public ChuyenBuocXuLyHoSoCommandHandler(IInjectConfiguration injectConfiguration, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        IMinioService minioService, IEventPublisher eventPublisher, IRepository<KetQuaLienQuan> repositoryKetQuaLienQuan,
        IRepository<YeuCauThanhToan> repositoryYeuCauThanhToan, ISyncDVCQGService syncDVCQGService, ILogger<HoSo> logger,
        IDapperRepository dapperRepository, IUserService user, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
        IRepository<NgayNghi> repositoryNgayNghi, IRepository<HoSo> repositoryHoSo, IHoSoServices hoSoServices, IEMCService eMCService, IInjectConfiguration configuration,
        IZaloService zaloService, IJobService jobService, INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _dapperRepository = dapperRepository;
        _user = user;
        _minioService = minioService;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _repositoryHoSo = repositoryHoSo;
        _hoSoServices = hoSoServices;
        _logger = logger;
        _eMCService = eMCService;
        _syncDVCQGService = syncDVCQGService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        bool? batBuocDinhKemTPHS = injectConfiguration.GetValue<bool?>("GLOBAL_CONFIG:KhongChoChuyenHoSoMoiTiepNhanNeuKhongCoDinhKemTPHS");
        _batBuocDinhKemTPHS = (batBuocDinhKemTPHS == false || batBuocDinhKemTPHS == null) ? false : true;
        _ltqlvbSettings = injectConfiguration.GetFromSection<LTQLVBSettings>(nameof(LTQLVBSettings));
        _zaloService = zaloService;
        _jobService = jobService;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _repositoryKetQuaLienQuan = repositoryKetQuaLienQuan;
        _eventPublisher = eventPublisher;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    private void SendZalo(HoSoQLVB hoSo, CancellationToken cancellationToken)
    {
        try
        {
            if ((!string.IsNullOrEmpty(hoSo.SoDienThoaiNguoiUyQuyen) || !string.IsNullOrEmpty(hoSo.SoDienThoaiChuHoSo)))
            {
                string loiNhan = $"Hồ sơ của ông bà đã được chuyển cho cán bộ chuyên viên xử lý";
                if (usingZaloTemplate)
                {
                    SendTemplateZalo sendTemplateZalo = new SendTemplateZalo(
                        null,
                        hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo,
                        hoSo.TrichYeuHoSo,
                        hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo,
                        hoSo.MaHoSo,
                        "Đang xử lý",
                        hoSo.TrichYeuHoSo,
                        loiNhan,
                        HoSoEventUtils.GetLinkTraCuu("", hoSo.MaHoSo ?? string.Empty, hoSo.SoGiayToNguoiUyQuyen ?? hoSo.SoGiayToChuHoSo ?? string.Empty),
                        null,
                        "Xem quá trình xử lý");
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

    public async Task<Result> Handle(ChuyenBuocXuLyHoSoCommand request, CancellationToken cancellationToken)
    {
        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlTruongHopThuTuc = "SELECT Top 1 NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHienTrucTuyen, ThoiGianThucHien, LoaiThoiGianThucHien, Ten, Ma, Id, BatBuocKySoKetQua, BatBuocDinhKemKetQua FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id,
        }, cancellationToken: cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        var maTrangThaiCu = hoSo.TrangThaiHoSoId;
        if(maTrangThaiCu == "2")
        {
            var yctt = await _repositoryYeuCauThanhToan.GetBySpecAsync(new GetYeuCauThuTruocChuaThanhToanSpec(hoSo.MaHoSo), cancellationToken);
            if (yctt != null)
            {
                return (Result)Result.Fail($"Hồ sơ với mã: {hoSo.MaHoSo} có phí/lệ phí chờ thanh toán");
            }
            if (hoSo.LaHoSoChungThuc == true || _batBuocDinhKemTPHS == true)
            {
                var tphs = await _repositoryThanhPhanHoSo.ListAsync<ThanhPhanHoSoDto>(new GetAllThanhPhanHoSoBySpec(hoSo.MaHoSo), cancellationToken);
                if(hoSo.LaHoSoChungThuc == true)
                {
                    if (tphs != null && tphs.Any(x => x.DinhKem?.ToLower().EndsWith(".pdf") == false))
                    {
                        return (Result)Result.Fail($"Hồ sơ với mã {hoSo.MaHoSo}: Vui lòng đính kèm tệp PDF vào từng thành phần hồ sơ");
                    }
                }
                if (_batBuocDinhKemTPHS == true)
                {
                    if (tphs != null && !tphs.Any(x => !string.IsNullOrEmpty(x.DinhKem)))
                    {
                        return (Result)Result.Fail($"Hồ sơ với mã {hoSo.MaHoSo}: Vui lòng đính kèm thành phần hồ sơ trước khi chuyển xử lý");
                    }
                }
            }
        }
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
        {
            hoSo.MaTruongHop
        }, cancellationToken: cancellationToken);
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
        if (!hoSo.NguoiDangXuLy.ToLower().Contains(currentUser.Id.ToString().ToLower()) || string.IsNullOrEmpty(hoSo.NguoiDangXuLy))
        {
            return (Result)Result.Fail("Bạn không phải người đang xử lý hồ sơ");
        }
        try
        {
            string dinhKemKetQua = request.DinhKemKetQua ?? hoSo.DinhKemKetQua;
            string loaiVanBanKetQua = request.LoaiVanBanKetQua ?? hoSo.LoaiVanBanKetQua;
            var coQuanBanHanhKetQua = request.CoQuanBanHanhKetQua ?? hoSo.CoQuanBanHanhKetQua;
            var soKyHieuKetQua = request.SoKyHieuKetQua ?? hoSo.SoKyHieuKetQua;
            var nguoiKyKetQua = request.NguoiKyKetQua ?? hoSo.NguoiKyKetQua;

            var updateHoSoData = await _hoSoServices.ChuyenBuoc(currentTime, truongHopThuTuc, hoSo, request.BuocHienTai, ngayNghis, soGioMacDinhBuocXuLy, currentUser, dinhKemKetQua, request.TrichYeuKetQua, request.NguoiXuLyTiep, loaiVanBanKetQua);
            if (updateHoSoData.MaTrangThai == "9")
            {
                if(truongHopThuTuc.BatBuocDinhKemKetQua == true)
                {
                    var filePaths = dinhKemKetQua;
                    if (string.IsNullOrEmpty(filePaths))
                    {
                        return (Result)Result.Fail($"Vui lòng đính kèm kết quả");
                    }
                }
                if (truongHopThuTuc.BatBuocKySoKetQua == true)
                {
                    var filePaths = dinhKemKetQua;
                    if (string.IsNullOrEmpty(filePaths))
                    {
                        return (Result)Result.Fail($"Vui lòng đính kèm kết quả");
                    }
                    var filePathList = filePaths.Split("##").ToList();
                    var verifyPdfSignatureResponse = await _minioService.VerifyPdfSignatureITextSharp(filePathList ,true);
                    if (!verifyPdfSignatureResponse.HasDigitalSinature)
                    {
                        return (Result)Result.Fail($"Vui lòng đính kèm ít nhất một tệp đính kèm kết quả đã được ký số");
                    }
                }
            }
            var dinhKemYKienNguoiChuyenXuLy = request.DinhKemYKienNguoiChuyenXuLy ?? hoSo.DinhKemYKienNguoiChuyenXuLy;
           
            var ngayBanHanhKetQua = request.NgayBanHanhKetQua ?? hoSo.NgayBanHanhKetQua;
            var ngayKyKetQua = request.NgayKyKetQua ?? hoSo.NgayKyKetQua;
            var trichYeuKetQua = request.TrichYeuKetQua ?? hoSo.TrichYeuKetQua;
            // nếu đơn vị người xử lý tiếp khác với đơn vị của người hiện tại và trạng thái node tiếp theo không phải là node trả kết quả thì xóa kết quả chính của người xử lý tiếp
            if (!string.IsNullOrEmpty(request.DonViNguoiTiepNhanXuLy) && request.DonViNguoiTiepNhanXuLy != currentUser.OfficeCode && updateHoSoData.MaTrangThai != "9")
            {
                var ketQuaLienQuan = new KetQuaLienQuan(hoSo.MaHoSo, loaiVanBanKetQua, soKyHieuKetQua, trichYeuKetQua, ngayKyKetQua, nguoiKyKetQua, coQuanBanHanhKetQua, ngayBanHanhKetQua, null, null, dinhKemKetQua);
                await _repositoryKetQuaLienQuan.AddAsync(ketQuaLienQuan);
                if (_ltqlvbSettings != null && _ltqlvbSettings.danhSachDonViUBTinh != null)
                {
                    // người nhận k phải thuộc UB nhân dân tỉnh => xóa trắng kết quả chính
                    if(_ltqlvbSettings.danhSachDonViUBTinh.Any() && _ltqlvbSettings.danhSachDonViUBTinh.Select(x => x.ToLower()).ToList().IndexOf(request.DonViNguoiTiepNhanXuLy.ToLower()) == -1)
                    {
                        loaiVanBanKetQua = "";
                        soKyHieuKetQua = "";
                        nguoiKyKetQua = "";
                        coQuanBanHanhKetQua = "";
                        ngayBanHanhKetQua = null;
                        ngayKyKetQua = null;
                        trichYeuKetQua = "";
                        dinhKemKetQua = "";
                    }
                } else
                {
                    loaiVanBanKetQua = "";
                    soKyHieuKetQua = "";
                    nguoiKyKetQua = "";
                    coQuanBanHanhKetQua = "";
                    ngayBanHanhKetQua = null;
                    ngayKyKetQua = null;
                    trichYeuKetQua = "";
                    dinhKemKetQua = "";

                }
            }

            hoSo.ChuyenBuocXuLy(updateHoSoData.TenBuoc, updateHoSoData.MaNodeSau, null, updateHoSoData.BuocXuLyTiep, currentUser.Id.ToString(), hoSo.BuocHienTai, currentUser.Id.ToString(), request.NguoiXuLyTiep,
                trichYeuKetQua, dinhKemKetQua, request.YKienNguoiChuyenXuLy, dinhKemYKienNguoiChuyenXuLy, updateHoSoData.MaTrangThai, currentTime, updateHoSoData.NgayHenTraCaNhan, updateHoSoData.NgayYeuCauBoSung,
                updateHoSoData.NgayHenTra, updateHoSoData.NgayTraKetQua,updateHoSoData.TrangThaiTraKq, updateHoSoData.DonViTraKq,
                loaiVanBanKetQua, soKyHieuKetQua, nguoiKyKetQua, coQuanBanHanhKetQua, ngayBanHanhKetQua, ngayKyKetQua, currentUser.OfficeCode, currentTime, currentUser.Id.ToString()
                ,updateHoSoData.LoaiKetQua);
            hoSo.SetDonViDaChuyenXuLy(currentUser.OfficeCode);
            if(updateHoSoData.LaBuocChuyenLTQLVB == true)
            {
                hoSo.SetDangChoBanHanh(true);
            }
            if(hoSo.TrangThaiHoSoId == "9")
            {
                hoSo.SetDangChoBanHanh(false);
            }
            hoSo.CapNhatHoSoTheoCauHinhNode(updateHoSoData.loaiDuLieuKetNoi, updateHoSoData.trangThaiChiTiet);
            
            var dinhKemChuyenXuLy = updateHoSoData.LaBuocChuyenLTQLVB == true ? request.DinhKemKetQua : null;

            await _repositoryHoSo.UpdateAsync(hoSo, cancellationToken);
            if(updateHoSoData.loaiDuLieuKetNoi == TruongHopThuTuc.LoaiDuLieuKetNoiBuoc.LienThongThueILIS)
            {
                await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(hoSo.Id);
            }
            else
            {
                await _nguoiXuLyHoSoService.UpdateAndRemoveOtherHandlers(hoSo.Id, request.NguoiXuLyTiep, cancellationToken);
            }

            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, updateHoSoData.BuocXuLyTiep, (double)updateHoSoData.ThoiHanBuocXuLy, updateHoSoData.LoaiThoiHanBuocXuLy, updateHoSoData.NgayHenTraCaNhanCu , currentUser.Id.ToString(), currentUser.FullName, request.NguoiXuLyTiep, "", currentTime, request.YKienNguoiChuyenXuLy, dinhKemChuyenXuLy, updateHoSoData.TenThaoTac ?? "", updateHoSoData.MaTrangThai);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);


            await _eventPublisher.PublishAsync(new ChuyenBuocNotificationEvent(hoSo, request.NguoiXuLyTiep, currentUser.FullName + " " + updateHoSoData.TenThaoTac + " " + hoSo.MaHoSo, updateHoSoData.NotificationType, updateHoSoData.MaTrangThai, updateHoSoData.TrangThaiTraKq));

        }
        catch (Exception ex)
        {
            _logger.LogError($"{hoSo.MaHoSo}_{ex.ToString()}");
            return (Result)Result.Fail(ex.Message.ToString());

        }

        
        if (hoSo.TrangThaiTraKq == _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ)
        {
            await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog));
        }
        if (hoSo.LoaiDuLieuKetNoi == "TBKM" || hoSo.LoaiDuLieuKetNoi == "TBKMBS")
        {
            await _syncDVCQGService.DongBoDVCQG(hoSo);
        }
        if (maTrangThaiCu == "2" && hoSo.TrangThaiHoSoId == "4")
        {
            SendZalo(hoSo, cancellationToken);
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
