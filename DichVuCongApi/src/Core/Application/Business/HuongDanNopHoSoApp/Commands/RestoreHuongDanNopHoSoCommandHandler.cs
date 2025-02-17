using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Commands;
public class RestoreHuongDanNopHoSoCommandHandler : ICommandHandler<RestoreHuongDanNopHoSoCommand>
{
    private readonly IRepositoryWithEvents<HuongDanNopHoSo> _repositoryWithEvents;
    public RestoreHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<HuongDanNopHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HuongDanNopHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
