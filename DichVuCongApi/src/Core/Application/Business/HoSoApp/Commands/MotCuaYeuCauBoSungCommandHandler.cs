using Newtonsoft.Json;
using System.Transactions;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class MotCuaYeuCauBoSungCommandHandler : ICommandHandler<MotCuaYeuCauBoSungCommand>
{
    private readonly IHoSoServices _hoSoServices;
    private readonly ICurrentUser _user;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly IJobService _jobService;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly IMediator _mediator;
    private readonly IEventPublisher _publisher;
    private readonly string tenTinhThanh;
    private readonly IKhaiSinhKhaiTuService _khaiSinhKhaiTuService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly ILLTPService _lLTPService;

    public MotCuaYeuCauBoSungCommandHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, ILLTPService lLTPService, IRepositoryWithEvents<ThanhPhanHoSo> repositoryThanhPhanHoSo, IKhaiSinhKhaiTuService khaiSinhKhaiTuService, IHoSoServices hoSoServices, IRepositoryWithEvents<HoSo> repositoryHoSo, ICurrentUser user, IDapperRepository dapperRepository, IJobService jobService, IInjectConfiguration injectConfiguration, IMediator mediator, IEventPublisher eventPublisher)
    {
        _user = user;
        _repositoryHoSo = repositoryHoSo;
        _hoSoServices = hoSoServices;
        _dapperRepository = dapperRepository;
        _jobService = jobService;
        _iInjectConfiguration = injectConfiguration;
        _mediator = mediator;
        _publisher = eventPublisher;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
        _khaiSinhKhaiTuService = khaiSinhKhaiTuService;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _lLTPService = lLTPService;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    public async Task<Result> Handle(MotCuaYeuCauBoSungCommand request, CancellationToken cancellationToken)
    {
        var userId = _user.GetUserId();
        var userOfficeCode = _user.GetUserOfficeCode();
        var userOfficeName = _user.GetUserOfficeName();
        string catalog = string.Empty;
        string soDienThoaiDonVi = string.Empty;
        string ofGroupName = string.Empty;

        string sqlGetUserInfo = @"SELECT u.Id, g.MaDinhDanh, u.FullName, u.OfficeCode, g.GroupName, g.DiaChi as DiaChiDonVi from [Identity].[Users] u INNER JOIN Catalog.Groups g ON u.OfficeCode = g.GroupCode where u.Id = @Id";
        var userInfo = await _dapperRepository.QueryFirstOrDefaultAsync<UserInfo>(sqlGetUserInfo, new
        {
            Id = userId
        });
        if (userInfo == null)
        {
            throw new NotFoundException($"Không tìm thấy người dùng: {userId}");
        }

        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id, cancellationToken);
        if (hoSo == null)
        {
            throw new NotFoundException($"hoso với mã: {request.Id} chưa được thêm vào hệ thống");
        }

        var maTrangThaiHienTai = hoSo.TrangThaiHoSoId;
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        }
        try
        {
            // Sửa logic cần phải sửa lại ở SyncQLVBService
            if (maTrangThaiHienTai == "1" || maTrangThaiHienTai == "2" || maTrangThaiHienTai == "4")
            {
                var updateSucced = await _hoSoServices.YeuCauMotCuaBoSungHoSo(request, hoSo, currentTime, userInfo.FullName, userId.ToString(), "Cán bộ một cửa yêu cầu bổ sung");
                if(request.ThanhPhanHoSo != null && request.ThanhPhanHoSo.Count > 0)
                {
                    List<ThanhPhanHoSo> thanhPhanHoSos = new List<ThanhPhanHoSo>();
                    for (int i = 0; i < request.ThanhPhanHoSo.Count; i++)
                    {
                        ThanhPhanBoSungHoSo currTPHS = request.ThanhPhanHoSo[i];
                        var thanhPhanHoSo = new ThanhPhanHoSo(currTPHS.TenThanhPhan, hoSo.MaHoSo, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
                        thanhPhanHoSo.SetNoiDungBoSung(currTPHS.NoiDungBoSung);
                        thanhPhanHoSos.Add(thanhPhanHoSo);
                    }
                    await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos);
                }
                if (updateSucced)
                {
                    int updateKSKTCount = await _khaiSinhKhaiTuService.AddTrangThaiDVCLT(hoSo.MaHoSo, "2", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
                    int updateLLTPCount = await _lLTPService.AddTrangThaiDVCLT(hoSo.MaHoSo, "5", TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi);
                    if(updateKSKTCount > 0 || updateLLTPCount > 0)
                    {
                        await _nguoiXuLyHoSoService.SetCurrentUserAsRemoved(hoSo.Id);
                    }
                }
            }
            else
            {
                return (Result)Result.Fail("Hồ sơ không ở trạng thái đang xử lý");
            }
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        GroupDto groupInfo = null;
        string donViQuanLyThuPhi = userOfficeCode;
        string donViQuanLy = userOfficeCode;
        if (!string.IsNullOrEmpty(userOfficeCode))
        {
            var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(userOfficeCode));
            if (groupsInfo != null)
            {
                groupInfo = groupsInfo.Data;
                catalog = groupInfo.Catalog;
                soDienThoaiDonVi = groupInfo.SoDienThoai;
                ofGroupName = groupInfo.OfGroupName;
            }
        }
        await _publisher.PublishAsync(new MotCuaYeuCauBoSungHoSoEvent(hoSo, request.MaGiayToHoSo, hoSo.TrangThaiHoSoId, _user.GetUserFullName(), userOfficeName, request.LyDoBoSung, request.ThoiHanBoSung.ToString(), ofGroupName, catalog, ofGroupName, tenTinhThanh, soDienThoaiDonVi));
        return (Result)Result.Success();
    }
}
