using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class AddThuSauYeuCauThanhToanHanlder : ICommandHandler<AddThuSauYeuCauThanhToan>
{
    private readonly IMediator _mediator;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryYeuCauThanhToan;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    private readonly IDapperRepository _dapperRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly string tenTinhThanh;
    public AddThuSauYeuCauThanhToanHanlder(IUserService user, IMediator mediator, IRepositoryWithEvents<YeuCauThanhToan> repositoryYeuCauThanhToan
        , IDapperRepository dapperRepository, IEventPublisher eventPublisher, IInjectConfiguration injectConfiguration)
    {
        _user = user;
        _mediator = mediator;
        _repositoryYeuCauThanhToan = repositoryYeuCauThanhToan;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        _dapperRepository = dapperRepository;
        _eventPublisher = eventPublisher;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
    }
    public async Task<Result> Handle(AddThuSauYeuCauThanhToan request, CancellationToken cancellationToken)
    {
        var _currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        var userOfficeCode = _currentUser.OfficeCode;
        var userId = _currentUser.Id;
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var userFullName = _currentUser.FullName;
        var userOfficeName = _currentUser.OfficeName;
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSo, new
        {
            Id = request.HoSoId
        });
        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.HoSoId} chưa được thêm vào hệ thống");
        }

        if (request.Id == null) throw new ArgumentNullException(nameof(request.Id));
        var itemExitst = await _repositoryYeuCauThanhToan.GetByIdAsync(request.Id, cancellationToken);

        if (request.HinhThucThu == YeuCauThanhToanConstant.HinhThucThu_DoiTuongMienPhi)
        {
            var updatedTinBai1 = itemExitst.UpdateThuSau(0, 0, 0, _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN, null, request.ChiTiet, currentTime);
            await _repositoryYeuCauThanhToan.UpdateAsync(updatedTinBai1, cancellationToken);
            return (Result)Result.Success();
        }
        int phi = request.Phi.HasValue ? request.Phi.Value : 0;
        int lePhi = request.LePhi.HasValue ? request.LePhi.Value : 0;
        int soTien = phi + lePhi;
        if (soTien <= 0) throw new Exception("Số tiền yêu cầu thanh toán không hợp lệ");
        if (itemExitst == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.UpdateThuSau(phi + lePhi, request.Phi, request.LePhi, _yeuCauThanhToanConstants.TRANG_THAI.CHO_THANH_TOAN, null, request.ChiTiet);
        await _repositoryYeuCauThanhToan.UpdateAsync(updatedTinBai, cancellationToken);
        await _eventPublisher.PublishAsync(new ThongBaoNopPhiEvent(hoSo, itemExitst.HinhThucThu, itemExitst.Phi, request.LePhi.HasValue ? request.LePhi.Value : 0,
            userFullName, userOfficeName, hoSo.Catalog, tenTinhThanh, hoSo.SoDienThoai, itemExitst.Id.ToString()));

        //if (!string.IsNullOrEmpty(userOfficeCode))
        //{
        //    var groupsInfo = await _mediator.Send(new GetByGroupCodeQuery(userOfficeCode));
        //    if (groupsInfo != null) groupInfo = groupsInfo.Data;

        //}
        //if (groupInfo != null && groupInfo.DonViQuanLyThuPhi == true && !string.IsNullOrEmpty(groupInfo?.DonViQuanLy))
        //{
        //    itemExitst.
        //}
        //else
        //{

        //}

        return (Result)Result.Success();
    }
}
