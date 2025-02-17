using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public class RestoreThanhPhanHuongDanNopHoSoCommandHandler : ICommandHandler<RestoreThanhPhanHuongDanNopHoSoCommand>
{
    private readonly IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> _repositoryWithEvents;
    public RestoreThanhPhanHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreThanhPhanHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThanhPhanHuongDanNopHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
