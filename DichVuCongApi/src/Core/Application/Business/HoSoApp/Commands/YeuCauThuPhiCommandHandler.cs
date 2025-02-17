using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

public class YeuCauThuPhi_CheckHoSo
{
    public string MaHoSo { get; set; }
}

public class ChuaThanhToanYeuCauPhiLePhiSpec : Specification<YeuCauThanhToan>, ISingleResultSpecification
{
    public ChuaThanhToanYeuCauPhiLePhiSpec(string maHoSo)
    {
        var trangThaiThanhToan = new YeuCauThanhToanConstants();

        Query.Where(x => x.DeletedOn == null)
            .Where(x => x.TrangThai == trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN || x.TrangThai == trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN)
            .Where(x => x.MaHoSo == maHoSo);
    }
}

public class YeuCauThuPhiCommandHandler : ICommandHandler<YeuCauThuPhiCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly ICurrentUser _user;
    private readonly IMediator _mediator;
    private readonly bool usingZaloTemplate = false;
    private readonly IZaloService _zaloService;
    private readonly IJobService _jobService;
    private readonly IEventPublisher _eventPublisher;
    private readonly string tenTinhThanh;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    public YeuCauThuPhiCommandHandler(IInjectConfiguration injectConfiguration, IEventPublisher eventPublisher, IDapperRepository dapperRepository, IRepositoryWithEvents<HoSo> repositoryHoSo, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<YeuCauThanhToan> repositoryYeuCauThanhToan, ICurrentUser user, IMediator mediator, IZaloService zaloService, IInjectConfiguration configuration, IJobService jobService)
    {
        _dapperRepository = dapperRepository;
        _repositoryHoSo = repositoryHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _user = user;
        _mediator = mediator;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
        _zaloService = zaloService;
        _jobService = jobService;
        _eventPublisher = eventPublisher;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    }

    public async Task<Result> Handle(YeuCauThuPhiCommand request, CancellationToken cancellationToken)
    {
        var thaoTac = string.Empty;
        var userId = _user.GetUserId();
        var userOfficeCode = _user.GetUserOfficeCode();
        var userFullName = _user.GetUserFullName();
        var userOfficeName = _user.GetUserOfficeName();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        DateTime? ngayThuPhi = null;
        //var hoSo = await _repositoryHoSo.GetByIdAsync(request.Id);
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
        var chuaThanhToan = await _repositoryYeuCauThanhToan.FirstOrDefaultAsync(new ChuaThanhToanYeuCauPhiLePhiSpec(hoSo.MaHoSo));
        if (chuaThanhToan != null && chuaThanhToan.TrangThai == _yeuCauThanhToanConstants.TRANG_THAI.CHO_THANH_TOAN) // có yêu cầu chưa thanh toán
        {
            return (Result)Result.Fail("Hồ sơ có yêu cầu thanh toán chưa thực hiện!");
        }
        GroupDto groupInfo = null;
        var trangThaiThanhToan = new YeuCauThanhToanConstants();
        YeuCauThanhToan yeuCauThanhToan;
        string yeuCauThanhToanId = string.Empty;
        var trangThaiYeuCau = string.Empty;
        trangThaiYeuCau = trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN;
        if (!string.IsNullOrEmpty(hoSo.DonViId))
        {
            var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(hoSo.DonViId));
            if (groupsInfo != null) groupInfo = groupsInfo.Data;
        }
        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
        try
        {
            if (chuaThanhToan != null && chuaThanhToan.TrangThai == _yeuCauThanhToanConstants.TRANG_THAI.CHUA_THANH_TOAN)
            {
                AddThuSauYeuCauThanhToan thuSauYeuCauThanhToan = new AddThuSauYeuCauThanhToan();
                thuSauYeuCauThanhToan.Id = chuaThanhToan.Id;
                thuSauYeuCauThanhToan.HoSoId = request.Id;
                thuSauYeuCauThanhToan.Phi = request.PhiThu;
                thuSauYeuCauThanhToan.LePhi = request.LePhiThu;
                thuSauYeuCauThanhToan.HinhThucThu = request.HinhThucThu;
                thuSauYeuCauThanhToan.ChiTiet = JsonConvert.SerializeObject(request.PhiLePhi);
                thaoTac = "Yêu cầu thu phí sau hồ sơ";
                var resThuSau = await _mediator.Send(thuSauYeuCauThanhToan);
                return (Result)Result.Success("Đã yêu cầu thu sau phi, lệ phí thành công");
            }
            if (request.HinhThucThu == YeuCauThanhToanConstant.HinhThucThu_ThuTruoc)
            {
                thaoTac = "Yêu cầu thu phí hồ sơ";
            }
            else if (request.HinhThucThu == YeuCauThanhToanConstant.HinhThucThu_ThuSau)
            {
                thaoTac = "Yêu cầu thu phí sau hồ sơ";
                trangThaiYeuCau = hoSo.TrangThaiHoSoId != "1" && hoSo.TrangThaiHoSoId != "2" ? trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN : trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN;
            }
            else if (request.HinhThucThu == YeuCauThanhToanConstant.HinhThucThu_DoiTuongMienPhi)
            {
                thaoTac = "Yêu cầu thu phí cho đối tượng miễn phí";
                trangThaiYeuCau = trangThaiThanhToan.TRANG_THAI.DA_THANH_TOAN;
                ngayThuPhi = currentTime;

            }
            if (groupInfo != null && groupInfo.DonViQuanLyThuPhi == true && !string.IsNullOrEmpty(groupInfo?.DonViQuanLy))
            {
                yeuCauThanhToan = new YeuCauThanhToan(hoSo.MaHoSo, request.PhiThu + request.LePhiThu, request.PhiThu, request.LePhiThu, trangThaiYeuCau, currentTime, userId.ToString(), groupInfo?.DonViQuanLy, request.HinhThucThu, JsonConvert.SerializeObject(request.PhiLePhi), donVi: groupInfo?.GroupCode, currentTime);
            }
            else
            {
                yeuCauThanhToan = new YeuCauThanhToan(hoSo.MaHoSo, request.PhiThu + request.LePhiThu, request.PhiThu, request.LePhiThu, trangThaiYeuCau, currentTime, userId.ToString(), groupInfo?.GroupCode, request.HinhThucThu, JsonConvert.SerializeObject(request.PhiLePhi), donVi: groupInfo?.GroupCode, currentTime);
            }

            //hoSo.YeuCauThuPhi();
            //await _repositoryHoSo.UpdateAsync(hoSo);
            var newYeuCauThanhToan = await _repositoryYeuCauThanhToan.AddAsync(yeuCauThanhToan, cancellationToken);
            yeuCauThanhToanId = newYeuCauThanhToan.Id.ToString();
            if (request.CoLuuVet == true)
            {
                var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "", thaoTac: thaoTac);
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
            }

            //SendZalo(request, hoSo, cancellationToken);

            //transactionScope.Complete();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        //}
        if (trangThaiYeuCau == trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN && !string.IsNullOrEmpty(yeuCauThanhToanId))
        {
            await _eventPublisher.PublishAsync(new ThongBaoNopPhiEvent(hoSo, request.HinhThucThu, request.PhiThu, request.LePhiThu, userFullName, userOfficeName, hoSo.Catalog, tenTinhThanh, hoSo.SoDienThoai, yeuCauThanhToanId));
        }
        return (Result)Result.Success();
    }
}
