using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Commands;

public class UpdateHuongDanNopHoSoCommandHandler : ICommandHandler<UpdateHuongDanNopHoSoCommand>
{
    private readonly IRepositoryWithEvents<HuongDanNopHoSo> _repositoryWithEvents;
    private IMediator _mediator;
    private readonly IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> _repositoryWithEventsTp;
    public UpdateHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<HuongDanNopHoSo> repositoryWithEvents, IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> repositoryWithEventsTp, IMediator mediator = null)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _repositoryWithEventsTp = repositoryWithEventsTp;
        _mediator = mediator;
    }

    public async Task<Result> Handle(UpdateHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.ChuHoSo, request.SoDienThoaiChuHoSo, request.DiaChiChuHoSo,request.SoGiayToChuHoSo,request.EmailChuHoSo, request.MaTTHC,
            null,request.MaLinhVuc,request.TenLinhVuc,request.TruongHopId,request.TenTruongHop,request.TrichYeuHoSo,request.LyDoBoSung,request.LyDoTuChoi);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);

        if (request.ThanhPhanHoSos != null && request.ThanhPhanHoSos.Count > 0)
            await _mediator.Send(new DeleteThanhPhanHuongDanNopHoSoByMaHoSo(itemExitst.Id.ToString()));
            await _repositoryWithEventsTp.UpdateRangeAsync(request.ThanhPhanHoSos);
        return (Result)Result.Success();
    }
}
