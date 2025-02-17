using System.Collections.Immutable;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenBuocNhanhCommandHandler : ICommandHandler<ChuyenBuocNhanhCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _user;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IRepository<HoSo> _repositoryHoSo;
    private readonly IHoSoServices _hoSoServices;
    private readonly IEMCService _eMCService;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private int soGioMacDinhBuocXuLy = 2;
    private readonly IZaloService _zaloService;
    private readonly IJobService _jobService;
    private readonly IRepository<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly bool usingZaloTemplate = false;
    private readonly IEventPublisher _eventPublisher;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly bool _batBuocDinhKemTPHS = false;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
    public ChuyenBuocNhanhCommandHandler(IInjectConfiguration injectConfiguration, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo,
        IEventPublisher eventPublisher, IRepository<YeuCauThanhToan> repositoryYeuCauThanhToan,
        ISyncDVCQGService syncDVCQGService, IDapperRepository dapperRepository, IUserService user,
        IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepository<NgayNghi> repositoryNgayNghi,
        IRepository<HoSo> repositoryHoSo, IHoSoServices hoSoServices, IEMCService eMCService, IZaloService zaloService,
        IInjectConfiguration configuration, IJobService jobService, INguoiXuLyHoSoService nguoiXuLyHoSoService)
    {
        _dapperRepository = dapperRepository;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _user = user;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryNgayNghi = repositoryNgayNghi;
        _repositoryHoSo = repositoryHoSo;
        _hoSoServices = hoSoServices;
        _eMCService = eMCService;
        _syncDVCQGService = syncDVCQGService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _zaloService = zaloService;
        _jobService = jobService;
        _eventPublisher = eventPublisher;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
        bool? batBuocDinhKemTPHS = injectConfiguration.GetValue<bool?>("GLOBAL_CONFIG:KhongChoChuyenHoSoMoiTiepNhanNeuKhongCoDinhKemTPHS");
        _batBuocDinhKemTPHS = (batBuocDinhKemTPHS == false || batBuocDinhKemTPHS == null) ? false : true;
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
                        _zaloService.GetZaloCtaLink(hoSo.MaHoSo),
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
    public async Task<Result> Handle(ChuyenBuocNhanhCommand request, CancellationToken cancellationToken)
    {
        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var sqlTruongHopThuTuc = "SELECT NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, ThoiGianThucHienTrucTuyen, LoaiThoiGianThucHien, Ten, Ma, Id FROM Business.TruongHopThuTucs WHERE Ma IN @MaTruongHops";
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSos = await _dapperRepository.QueryAsync<HoSoQLVB>(hoSoSelect.GetHoSos, new
        {
            request.Ids
        });
        var canFastForwardHoSos = hoSos.Where(hoSo => !string.IsNullOrEmpty(hoSo.NguoiXuLyTiep) && !string.IsNullOrEmpty(hoSo.BuocXuLyTiep)).ToList();

        List<HoSo> updateListHoSos = new List<HoSo>();
        List<QuaTrinhXuLyHoSo> updateListQuaTrinhHoSos = new List<QuaTrinhXuLyHoSo>();
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
        var truongHopThuTucs = await _dapperRepository.QueryAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
        {
            MaTruongHops = canFastForwardHoSos.Select(x => x.MaTruongHop).ToList(),
        }, cancellationToken: cancellationToken);
        
        try
        {
            for (int i = 0; i < canFastForwardHoSos.Count; i++)
            {
                var hoSo = canFastForwardHoSos[i];
                var trangThaiCu = hoSo.TrangThaiHoSoId;
                if (trangThaiCu == "2")
                {
                    var yctt = await _repositoryYeuCauThanhToan.GetBySpecAsync(new GetYeuCauThuTruocChuaThanhToanSpec(hoSo.MaHoSo), cancellationToken);
                    if (yctt != null)
                    {
                        continue;
                    }
                    if (hoSo.LaHoSoChungThuc == true || _batBuocDinhKemTPHS == true)
                    {
                        var tphs = await _repositoryThanhPhanHoSo.ListAsync<ThanhPhanHoSoDto>(new GetAllThanhPhanHoSoBySpec(hoSo.MaHoSo), cancellationToken);
                        //if (tphs != null && tphs.Any(x => x.DinhKem?.ToLower().EndsWith(".pdf") == false))
                        //{
                        //    continue;
                        //}
                        if (hoSo.LaHoSoChungThuc == true)
                        {
                            if (tphs != null && tphs.Any(x => x.DinhKem?.ToLower().EndsWith(".pdf") == false))
                            {
                                continue;
                            }
                        }
                        if (_batBuocDinhKemTPHS == true)
                        {
                            if (tphs != null && !tphs.Any(x => !string.IsNullOrEmpty(x.DinhKem)))
                            {
                                continue;
                            }
                        }
                    }
                }
                var truongHopThuTuc = truongHopThuTucs.FirstOrDefault(x => x.Ma == hoSo.MaTruongHop);
                var node = _hoSoServices.GetNextNode(truongHopThuTuc, hoSo.BuocHienTai);
                if(node != null && node.NextNode.data.guiLienThongQLVB == true)
                {
                    continue;
                }
                var updateHoSoData = await _hoSoServices.ChuyenBuoc(currentTime, truongHopThuTuc, hoSo, hoSo.BuocXuLyTiep, ngayNghis, soGioMacDinhBuocXuLy, currentUser, null, null, hoSo.NguoiXuLyTiep, hoSo.LoaiVanBanKetQua,hoSo.CoQuanBanHanhKetQua, hoSo.NguoiKyKetQua, hoSo.SoKyHieuKetQua);
                var updatedHoSo = hoSo.ChuyenBuocXuLy(updateHoSoData.TenBuoc, updateHoSoData.MaNodeSau, hoSo.NguoiXuLyTiep, "", currentUser.Id.ToString(), hoSo.BuocHienTai, currentUser.Id.ToString(), hoSo.NguoiXuLyTiep,
                    "", "", "", "", updateHoSoData.MaTrangThai, currentTime, updateHoSoData.NgayHenTraCaNhan, updateHoSoData.NgayYeuCauBoSung, updateHoSoData.NgayHenTra, updateHoSoData.NgayTraKetQua, updateHoSoData.TrangThaiTraKq, updateHoSoData.DonViTraKq, null,null,null,null,null, null, currentUser.OfficeCode, currentTime, currentUser.Id.ToString());
                updatedHoSo.SetDonViDaChuyenXuLy(currentUser.OfficeCode);
                updatedHoSo.CapNhatHoSoTheoCauHinhNode(updateHoSoData.loaiDuLieuKetNoi, updateHoSoData.trangThaiChiTiet);
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, hoSo.BuocXuLyTiep, updateHoSoData.ThoiHanBuocXuLy, updateHoSoData.LoaiThoiHanBuocXuLy, updateHoSoData.NgayHenTraCaNhanCu, currentUser.Id.ToString(), currentUser.FullName, hoSo.NguoiXuLyTiep, "", currentTime, "", "", updateHoSoData.TenThaoTac ?? "", updateHoSoData.MaTrangThai);
                updateListHoSos.Add(updatedHoSo);
                updateListQuaTrinhHoSos.Add(quaTrinhXuLyHoSo);
                if (updateHoSoData.loaiDuLieuKetNoi == TruongHopThuTuc.LoaiDuLieuKetNoiBuoc.LienThongThueILIS)
                {
                    await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(updatedHoSo.Id);
                }
                else
                {
                    await _nguoiXuLyHoSoService.UpdateAndRemoveOtherHandlers(updatedHoSo.Id, hoSo.NguoiXuLyTiep, cancellationToken: cancellationToken);
                }
                if (updatedHoSo.LoaiDuLieuKetNoi == "TBKM" || updatedHoSo.LoaiDuLieuKetNoi == "TBKMBS")
                {
                    await _syncDVCQGService.DongBoDVCQG(updatedHoSo);
                }
                await _eMCService.SendAction(new EMCRequestBody()
                {
                    CodeProfile = hoSo.MaHoSo,
                    CodeTTHC = hoSo.MaTTHC,
                    NameTTHC = hoSo.TenTTHC,
                    Status = updatedHoSo.TrangThaiHoSoId,
                    FormsReception = hoSo.KenhThucHien,
                    Level = hoSo.MucDo,
                    MaHoSo = hoSo.MaHoSo,
                    IsFromDVCQG = hoSo.LoaiDuLieuKetNoi,
                    IsDVCBC = hoSo.DangKyNhanHoSoQuaBCCIData,
                    User = hoSo.SoGiayToChuHoSo,
                });
                if (trangThaiCu == "2" && hoSo.TrangThaiHoSoId == "4")
                {
                    SendZalo(hoSo, cancellationToken);
                }
                if(updateHoSoData.TrangThaiTraKq == _trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ)
                {
                    await _eventPublisher.PublishAsync(new ThongBaoTraKetQuaEvent(hoSo, hoSo.TenDonVi, hoSo.Catalog));
                }
                await _eventPublisher.PublishAsync(new ChuyenBuocNotificationEvent(hoSo, hoSo.NguoiXuLyTiep, currentUser.FullName + " " + updateHoSoData.TenThaoTac + " " + hoSo.MaHoSo, updateHoSoData.NotificationType, updateHoSoData.MaTrangThai, updateHoSoData.TrangThaiTraKq));
            }
            await _repositoryHoSo.UpdateRangeAsync(updateListHoSos, cancellationToken);
            await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(updateListQuaTrinhHoSos, cancellationToken);
                
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);

        }
    }
}
