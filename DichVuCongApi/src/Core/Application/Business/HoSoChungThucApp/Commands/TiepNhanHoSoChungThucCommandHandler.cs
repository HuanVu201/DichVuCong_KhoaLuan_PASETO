using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.KetNoi.DVCQG;
using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.Sms;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using Mapster;
using TD.DichVuCongApi.Application.Business.HoSoApp.Validate;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using MediatR;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;

public class GetThanhPhanHoSosSpec : Specification<ThanhPhanHoSo>
{
    public GetThanhPhanHoSosSpec(List<Guid> Ids)
    {
        Query.Where(x => Ids.Contains(x.Id)).Where(x=> x.DeletedOn == null);
    }
    public GetThanhPhanHoSosSpec(string maHoSo)
    {
        Query.Where(x => x.HoSo == maHoSo);
    }
}

public class TiepNhanHoSoChungThucCommandHandler : ICommandHandler<TiepNhanHoSoChungThucCommand>
{
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IRepository<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly IJobService _jobService;
    private readonly IUserService _user;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IEMCService _eMCService;
    private readonly IDapperRepository _dapperRepository;
    private readonly IHoSoServices _hoSoServices;
    private readonly IInjectConfiguration _configuration;
    private readonly ISyncDVCQGService _syncDVCQGService;
    private readonly bool usingZaloTemplate = false;
    private readonly IZaloService _zaloService;
    private readonly IMediator _mediator;
    private readonly IEventPublisher _eventPublisher;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly string tenTinhThanh;
    private readonly string tinhThanh;

    public TiepNhanHoSoChungThucCommandHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, IEventPublisher eventPublisher, IMediator mediator, IRepository<YeuCauThanhToan> repositoryYeuCauThanhToan, IRepository<ThanhPhanHoSo> repositoryThanhPhanHoSo, ISyncDVCQGService syncDVCQGService, IHoSoServices hoSoServices, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IJobService jobService, IUserService user, IReadRepository<NgayNghi> repositoryNgayNghi, IEMCService eMCService, IDapperRepository dapperRepository, IInjectConfiguration configuration, IZaloService zaloService)
    {
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
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
        _zaloService = zaloService;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _mediator = mediator;
        _configuration = configuration;
        _eventPublisher = eventPublisher;
        tinhThanh = configuration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
        tenTinhThanh = configuration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh");
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    private async Task UpdateTPCT(List<TiepNhanChungThuc_ThanhPhanHoSo> reqThanhPhanHoSos, string maHoSo)
    {
        var ids = reqThanhPhanHoSos.Select(x => x.Id).ToList<Guid>();
        var thanhPhanHoSos = await _repositoryThanhPhanHoSo.ListAsync(new GetThanhPhanHoSosSpec(maHoSo));
        var thanhPhanNotInDbs = reqThanhPhanHoSos.Where(u => !thanhPhanHoSos.Select(x => x.Id.ToString().ToLower()).ToList().Contains(u.Id.ToString())).ToList();
        var newUpdateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        var newCreateThanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        for (int i = 0; i < thanhPhanHoSos.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanHoSos[i];
            var reqTPHS = reqThanhPhanHoSos.FirstOrDefault(x => x.Id == thanhPhanHoSo.Id);
            if (reqTPHS == null)
            {
                thanhPhanHoSo.SoftDelete();
            } else
            {
                thanhPhanHoSo.UpdateTiepNhanChungThuc(reqTPHS.MaGiayTo, reqTPHS.Ten, reqTPHS.SoTrang, reqTPHS.SoBanGiay, reqTPHS.KyDienTuBanGiay, reqTPHS.DinhKem);
                thanhPhanHoSo.SetDinhKemGoc(reqTPHS.DinhKem);
            }
            newUpdateThanhPhanHoSos.Add(thanhPhanHoSo);
        }
        var thanhPhanNotInDbsAdapter = thanhPhanNotInDbs.Adapt<List<ThanhPhanHoSo>>();
        for (int i = 0; i < thanhPhanNotInDbs.Count; i++)
        {
            var thanhPhanHoSo = thanhPhanNotInDbsAdapter[i];
            thanhPhanHoSo.SetDinhKemGoc(thanhPhanHoSo.DinhKem);
            newCreateThanhPhanHoSos.Add(thanhPhanHoSo);
        }
        await _repositoryThanhPhanHoSo.UpdateRangeAsync(newUpdateThanhPhanHoSos);
        await _repositoryThanhPhanHoSo.AddRangeAsync(newCreateThanhPhanHoSos);
    }
    public async Task<Result> Handle(TiepNhanHoSoChungThucCommand request, CancellationToken cancellationToken)
    {
        var user = await _user.GetCurrentUserAsync(cancellationToken);
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
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
        if (hoSo.LaHoSoChungThuc == false || hoSo.LaHoSoChungThuc == null)
        {
            return (Result)Result.Fail("Loại hồ sơ không phải hồ sơ chứng thực");
        }
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year), cancellationToken: cancellationToken);
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>("SELECT ThoiGianThucHienTrucTuyen, KhongCoNgayHenTra, ThoiGianThucHien, LoaiThoiGianThucHien,  NodeQuyTrinh, EdgeQuyTrinh FROM [Business].[TruongHopThuTucs] where Ma = @MaTruongHop and ThuTucId = @ThuTucId", new
        {
            hoSo.MaTruongHop,
            ThuTucId = hoSo.MaTTHC
        });
        GroupDto groupInfo = null;
        string donViQuanLyThuPhi = user.OfficeCode;
        string donViQuanLy = user.OfficeCode;
        if (!string.IsNullOrEmpty(user.OfficeCode))
        {
            var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(user.OfficeCode));
            if (groupsInfo != null) groupInfo = groupsInfo.Data;
        }
        if (groupInfo != null && groupInfo.DonViQuanLyThuPhi == true && !string.IsNullOrEmpty(groupInfo?.DonViQuanLy))
        {
            donViQuanLyThuPhi = groupInfo.DonViQuanLy;
        }
        if (groupInfo != null && !string.IsNullOrEmpty(groupInfo?.DonViQuanLy))
        {
            donViQuanLy = groupInfo.DonViQuanLy;
        }
        try
        {
                
            var ngayHenTraCaNhanCu = hoSo.NgayHenTraCaNhan;
            var currentNode = _hoSoServices.GetCurrentNode(truongHopThuTuc, request.BuocHienTai);
            var caculateTime = new CaculateTime(_configuration);
            double thoiGianThucHien = caculateTime.GetThoiGianXuLy(truongHopThuTuc, hoSo.KenhThucHien);
            double thoiGianHenTraCaNhan = caculateTime.GetThoiGianXuLy(currentNode, hoSo.KenhThucHien);
            DateTime? ngayHenTra = null;

            if (truongHopThuTuc.KhongCoNgayHenTra == false || truongHopThuTuc.KhongCoNgayHenTra == null)
            {
                ngayHenTra = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien);
            }
            var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianHenTraCaNhan, currentNode.data.loaiThoiGian);
            var updatedHoSo = hoSo.TiepNhanHoSoChungThuc(request.TenBuocHienTai, request.BuocHienTai, request.NguoiXuLyTiep, request.BuocXuLyTiep,
                user.Id.ToString(), user.Id.ToString(), "2", currentTime, ngayHenTraCaNhan, ngayHenTra, currentTime, thoiGianThucHien, request.LoaiThoiHanBuocXuLy);
            await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
            await _nguoiXuLyHoSoService.SetCurrentUserAsNguoiDangXuLy(hoSo.Id);

            if (!request.IsMultiple)
            {
                await UpdateTPCT(request.ThanhPhanHoSos, hoSo.MaHoSo);
            }
            #region yeu cau thanh toan
                
            var trangThaiThanhToan = new YeuCauThanhToanConstants();
            var yeuCauThanhToan = new YeuCauThanhToan(hoSo.MaHoSo, 0, 0, 0, trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN, currentTime, user.Id.ToString(), donViQuanLyThuPhi, "Thu sau", null, donVi: user.OfficeCode);
            await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan);
            #endregion
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, request.NodeQuyTrinh, null, null, ngayHenTraCaNhanCu, user.Id.ToString(), user.FullName, "", null, currentTime, trangThai: "2");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

        await _eventPublisher.PublishAsync(new TiepNhanHoSoTrucTuyenEvent(hoSo, truongHopThuTuc.ThoiGianThucHien, user.FullName, user.OfficeName, hoSo.TenTTHC, user.OfficeName, hoSo.Catalog, tinhThanh, tenTinhThanh, truongHopThuTuc.LoaiThoiGianThucHien, false));
        return Result<DefaultIdType>.Success(hoSo.Id);

    }
}
