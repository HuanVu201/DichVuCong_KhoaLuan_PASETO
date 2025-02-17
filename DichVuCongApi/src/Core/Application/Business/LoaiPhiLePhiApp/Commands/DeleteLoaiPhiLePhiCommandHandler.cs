using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
public class DeleteLoaiPhiLePhiCommandHandler : ICommandHandler<DeleteLoaiPhiLePhiCommand>
{
    private readonly IRepositoryWithEvents<LoaiPhiLePhi> _repositoryWithEvents;
    public DeleteLoaiPhiLePhiCommandHandler(IRepositoryWithEvents<LoaiPhiLePhi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteLoaiPhiLePhiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiPhiLePhi với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
