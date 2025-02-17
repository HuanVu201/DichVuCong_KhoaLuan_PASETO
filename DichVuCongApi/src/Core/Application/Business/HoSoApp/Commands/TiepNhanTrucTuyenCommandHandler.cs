using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Events;
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
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TiepNhanTrucTuyenCommandHandler : ICommandHandler<TiepNhanTrucTuyenCommand>
{

    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IJobService _jobService;
    private readonly IUserService _user;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IEMCService _eMCService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IInjectConfiguration _configuration;
    private readonly IHoSoServices _hoSoServices;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly bool usingZaloTemplate = false;
    private readonly IZaloService _zaloService;
    private readonly IEventPublisher _eventPublisher;
    private readonly IRepository<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly string tenTinhThanh;
    private readonly string tinhThanh;
    private readonly IKhaiSinhKhaiTuService _khaiSinhKhaiTuService;
    private readonly ILLTPService _lLTPService;
    private readonly ILogger<TiepNhanTrucTuyenCommandHandler> _logger;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;

    public TiepNhanTrucTuyenCommandHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, ILLTPService lLTPService, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, ILogger<TiepNhanTrucTuyenCommandHandler> logger, IKhaiSinhKhaiTuService khaiSinhKhaiTuService, IRepository<YeuCauThanhToan> repositoryYeuCauThanhToan, IEventPublisher eventPublisher, ISyncDVCQGService syncDVCQGService, IHoSoServices hoSoServices, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IJobService jobService, IUserService user, IReadRepository<NgayNghi> repositoryNgayNghi, IEMCService eMCService, IDapperRepository dapperRepository, IInjectConfiguration configuration, IZaloService zaloService)
    {
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _jobService = jobService;
        _user = user;
        _repositoryNgayNghi = repositoryNgayNghi;
        _eMCService = eMCService;
        _dapperRepository = dapperRepository;
        _hoSoServices = hoSoServices;
        _syncDVCQGService = syncDVCQGService;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        tinhThanh = configuration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
        tenTinhThanh = configuration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");
        _zaloService = zaloService;
        _configuration = configuration;
        _eventPublisher = eventPublisher;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _khaiSinhKhaiTuService = khaiSinhKhaiTuService;
        _logger = logger;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _lLTPService = lLTPService;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    private async Task UpdateTPCT(List<ThanhPhanHoSoUpdate> reqThanhPhanHoSos)
    {
        var ids = reqThanhPhanHoSos.Select(x => x.Id).ToList<Guid>();
        var thanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GetThanhPhanHoSosSpec(ids));
        var thanhPhanNotInDbs = reqThanhPhanHoSos.Where(u => !thanhPhanHoSos.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString())).ToList();
        var newUpdateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        var newCreateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        for (int i = 0; i < thanhPhanHoSos.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanHoSos[i];
            var reqTPHS = reqThanhPhanHoSos.FirstOrDefault(x => x.Id == thanhPhanHoSo.Id);
            if (reqTPHS == null) continue;

            var tphs = thanhPhanHoSo.UpdateTiepNhan(reqTPHS.Ten, reqTPHS.DinhKem, reqTPHS.TrangThaiSoHoa);
            newUpdateThanhPhanHoSos.Add(tphs);
        }
        var thanhPhanNotInDbsAdapter = thanhPhanNotInDbs.Adapt<List<ThanhPhanHoSo>>();
        for (int i = 0; i < thanhPhanNotInDbs.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanNotInDbsAdapter[i];
            newCreateThanhPhanHoSos.Add(thanhPhanHoSo);
        }
        await _repositoryThanhPhanHoSo.UpdateRangeAsync(newUpdateThanhPhanHoSos);
        await _repositoryThanhPhanHoSo.AddRangeAsync(newCreateThanhPhanHoSos);
    }
    public async Task<Result> Handle(TiepNhanTrucTuyenCommand request, CancellationToken cancellationToken)
    {
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            request.Id
        }, cancellationToken: cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        var yctt = await _repositoryYeuCauThanhToan.GetBySpecAsync(new GetYeuCauThuTruocChuaThanhToanSpec(hoSo.MaHoSo), cancellationToken);
        if (yctt != null)
        {
            return (Result)Result.Fail("Hồ sơ có phí/lệ phí chờ thanh toán");
        }

        if (hoSo.TrangThaiHoSoId == "1")
        {
            var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken);
            var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>("SELECT ThoiGianThucHienTrucTuyen, KhongCoNgayHenTra, ThoiGianThucHien, LoaiThoiGianThucHien,  NodeQuyTrinh, EdgeQuyTrinh FROM [Business].[TruongHopThuTucs] where Ma = @MaTruongHop and ThuTucId = @ThuTucId AND DeletedOn is null", new
            {
                hoSo.MaTruongHop,
                ThuTucId = hoSo.MaTTHC
            }, cancellationToken: cancellationToken);

            var ngayHenTraCaNhanCu = hoSo.NgayHenTraCaNhan;
            var currentNode = _hoSoServices.GetCurrentNode(truongHopThuTuc, request.BuocHienTai);
            var caculateTime = new CaculateTime(_configuration);
            double thoiGianThucHien = caculateTime.GetThoiGianXuLy(truongHopThuTuc, hoSo.KenhThucHien);
            double thoiGianHenTraCaNhan = caculateTime.GetThoiGianXuLy(currentNode, hoSo.KenhThucHien);
            DateTime? ngayHenTra = null;
            DateTime? ngayHenTraCaNhan = null;

            if (hoSo.LoaiDuLieuKetNoi == "LTKS" || hoSo.LoaiDuLieuKetNoi == "LTKT")
            {
                ngayHenTra = _khaiSinhKhaiTuService.TinhNgayHenTra(currentTime, ngayNghis);
                ngayHenTraCaNhan = ngayHenTra;
            }
            else
            {
                if (truongHopThuTuc.KhongCoNgayHenTra == false || truongHopThuTuc.KhongCoNgayHenTra == null)
                {
                    ngayHenTra = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien);
                }
                ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianHenTraCaNhan, currentNode.data.loaiThoiGian);
            }

            try
            {
                var updatedHoSo = hoSo.TiepNhanHoSoTrucTuyen(request.TenBuocHienTai, request.BuocHienTai, request.NguoiXuLyTiep, request.BuocXuLyTiep,
                    user.Id.ToString(), user.Id.ToString(), "2", currentTime, ngayHenTraCaNhan, ngayHenTra, currentTime, thoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien, request.TinhThanhDiaBan, request.QuanHuyenDiaBan, request.XaPhuongDiaBan, request.TenDiaBan);
                if (!string.IsNullOrEmpty(updatedHoSo.DonViPhiDiaGioi))
                {
                    updatedHoSo.SetTrangThaiPhiDiaGioi(HoSo_TrangThaiPhiDiaGioi.DangXuLy);
                }
                if (request.ChuyenSoHoa == true)
                {
                    updatedHoSo.SetTrangThaiSoHoa(HoSo_TrangThaiSoHoa.ChoSoHoa);
                }
                await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                await _nguoiXuLyHoSoService.SetCurrentUserAsNguoiDangXuLy(hoSo.Id);
                if (!request.IsMultiple)
                {
                    await UpdateTPCT(request.ThanhPhanHoSos);
                }
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, request.NodeQuyTrinh, null, null, ngayHenTraCaNhanCu, user.Id.ToString(), user.FullName, "", null, currentTime, trangThai: "2");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
                await _khaiSinhKhaiTuService.AddTrangThaiDVCLT(hoSo.MaHoSo, "3", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
                await _lLTPService.AddTrangThaiDVCLT(hoSo.MaHoSo, "2", TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            await _eventPublisher.PublishAsync(new TiepNhanHoSoTrucTuyenEvent(hoSo, truongHopThuTuc.ThoiGianThucHien, user.FullName, user.OfficeName, hoSo.TenTTHC, user.OfficeName, hoSo.Catalog, tinhThanh, tenTinhThanh, truongHopThuTuc.LoaiThoiGianThucHien, truongHopThuTuc.KhongCoNgayHenTra));
            return Result<DefaultIdType>.Success(hoSo.Id);
        }
        else
        {
            return (Result)Result.Fail("Hồ sơ không ở trạng thái chờ tiếp nhận");
        }
    }
}