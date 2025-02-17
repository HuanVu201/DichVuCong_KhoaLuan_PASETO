using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
public class RestoreLoaiPhiLePhiCommandHandler : ICommandHandler<RestoreLoaiPhiLePhiCommand>
{
    private readonly IRepositoryWithEvents<LoaiPhiLePhi> _repositoryWithEvents;
    public RestoreLoaiPhiLePhiCommandHandler(IRepositoryWithEvents<LoaiPhiLePhi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreLoaiPhiLePhiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiPhiLePhi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
