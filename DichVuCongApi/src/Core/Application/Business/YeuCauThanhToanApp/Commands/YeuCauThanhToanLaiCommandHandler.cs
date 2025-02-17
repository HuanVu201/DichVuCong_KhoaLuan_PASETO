using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class YeuCauThanhToanLaiCommandHandler : ICommandHandler<YeuCauThanhToanLaiCommand>
{
    private IMediator _mediator;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private readonly IUserService _currentUser;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    private readonly ILogger<BienLaiDienTuDto> _logger;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    public YeuCauThanhToanLaiCommandHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents, IUserService user, IMediator mediator, ILogger<BienLaiDienTuDto> logger, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = user;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        _mediator = mediator;
        _logger = logger;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
    }

    public async Task<Result> Handle(YeuCauThanhToanLaiCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        if (user == null)
        {
            throw new UnauthorizedException($"Không tìm thấy thông tin người thực hiện");
        }
        if (itemExitst == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        itemExitst.UpdateYeuCauThanhToanLai(null, null, request.Phi, request.LePhi, _yeuCauThanhToanConstants.TRANG_THAI.CHO_THANH_TOAN);
        await _repositoryWithEvents.UpdateAsync(itemExitst);
        var thaoTac = "Yêu cầu thanh toán lại";
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, null, null, null, null, user.Id.ToString(), user.FullName, "", "", currentTime, trangThai: "", thaoTac: thaoTac);
        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        return (Result)Result.Success();
    }
}
