using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;

public class UpdateThanhPhanHuongDanNopHoSoCommandHandler : ICommandHandler<UpdateThanhPhanHuongDanNopHoSoCommand>
{
    private readonly IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> _repositoryWithEvents;

    public UpdateThanhPhanHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateThanhPhanHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThanhPhanHuongDanNopHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedThanhPhanHuongDanNopHoSo = itemExitst.Update(request.Ten, request.HoSo, request.SoBanChinh,
            request.SoBanSao, request.GhiChu);
        await _repositoryWithEvents.UpdateAsync(updatedThanhPhanHuongDanNopHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}
