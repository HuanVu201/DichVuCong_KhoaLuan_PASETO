using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class UpdateBienLaiDienTuHandler : ICommandHandler<UpdateBienLaiDienTu, BienLaiDienTuDto>
{
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private readonly IMediator _mediator;
    public UpdateBienLaiDienTuHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }
    public async Task<Result<BienLaiDienTuDto>> Handle(UpdateBienLaiDienTu request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        if (!request.IdYeuCauThanhToan.HasValue) throw new ArgumentNullException(nameof(request.IdYeuCauThanhToan));
        if (string.IsNullOrEmpty(request.LoaiPhi)) throw new ArgumentNullException(nameof(request.LoaiPhi));
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.IdYeuCauThanhToan, cancellationToken);
        if (itemExitst == null) throw new Exception($"Yêu cầu thanh toán có mã {request.IdYeuCauThanhToan} chưa được thêm vào hệ thống");
        //if (!string.IsNullOrEmpty(request.LoaiPhi) && request.LoaiPhi == "phi" && (itemExitst.Phi <= 0 || string.IsNullOrEmpty(itemExitst.SoBienLaiPhi)))
        //    throw new Exception("Chưa có biên lai phí");
        //if (!string.IsNullOrEmpty(request.LoaiPhi) && request.LoaiPhi == "lephi" && (itemExitst.LePhi <= 0 || string.IsNullOrEmpty(itemExitst.SoBienLaiLePhi)))
        //    throw new Exception("Chưa có biên lai lệ phí");
        if ((request.LoaiPhi == "phi" && request.Phi > 0 && itemExitst.Phi <= 0) || (request.LoaiPhi == "lephi" && request.LePhi > 0 && itemExitst.LePhi <= 0))
        {
            var updateBienLai = itemExitst.UpdateBienLaiDienTu(request.Phi, request.LePhi, request.TenPhiBienLai, request.TenLePhiBienLai, request.NguoiNopTienBienLai, request.DiaChiBienLai, request.MaSoThueBienLai, request.EmailNguoiNopTienBienLai, request.HinhThucThanhToan);
            await _repositoryWithEvents.UpdateAsync(updateBienLai, cancellationToken);
            InitBienLaiDienTuQuery initBienLaiDienTuQuery = new InitBienLaiDienTuQuery(request.IdYeuCauThanhToan, request.LoaiPhi);
            var resInit = await _mediator.Send(initBienLaiDienTuQuery);
            return resInit;
        }
        else
        {
            CancelBienLaiDienTuCommand cancel = new CancelBienLaiDienTuCommand(request.IdYeuCauThanhToan, request.LoaiPhi);
            var resCancel = await _mediator.Send(cancel, cancellationToken);
            if (resCancel.Succeeded)
            {
                var updateBienLai = itemExitst.UpdateBienLaiDienTu(request.Phi, request.LePhi, request.TenPhiBienLai, request.TenLePhiBienLai, request.NguoiNopTienBienLai, request.DiaChiBienLai, request.MaSoThueBienLai, request.EmailNguoiNopTienBienLai, request.HinhThucThanhToan);
                await _repositoryWithEvents.UpdateAsync(updateBienLai, cancellationToken);
                if ((request.LoaiPhi == "phi" && updateBienLai.Phi > 0) || (request.LoaiPhi == "lephi" && updateBienLai.LePhi > 0))
                {
                    InitBienLaiDienTuQuery initBienLaiDienTuQuery = new InitBienLaiDienTuQuery(request.IdYeuCauThanhToan, request.LoaiPhi);
                    var resInit = await _mediator.Send(initBienLaiDienTuQuery);
                    return resInit;
                }
            }
        }
        return null;
    }
}
