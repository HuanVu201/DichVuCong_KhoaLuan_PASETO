using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Commands;
public class RestoreQuaTrinhXuLyHoSoCommandHandler : ICommandHandler<RestoreQuaTrinhXuLyHoSoCommand>
{
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryWithEvents;
    public RestoreQuaTrinhXuLyHoSoCommandHandler(IRepository<QuaTrinhXuLyHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreQuaTrinhXuLyHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuaTrinhXuLyHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
