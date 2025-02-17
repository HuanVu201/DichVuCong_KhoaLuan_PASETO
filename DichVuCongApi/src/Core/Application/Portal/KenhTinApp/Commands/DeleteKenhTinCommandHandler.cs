using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;
public class DeleteKenhTinCommandHandler : ICommandHandler<DeleteKenhTinCommand>
{
    private readonly IRepositoryWithEvents<KenhTin> _repositoryWithEvents;
    public DeleteKenhTinCommandHandler(IRepositoryWithEvents<KenhTin> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(DeleteKenhTinCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Kênh tin với mã: {request.Id} chưa được thêm vào hệ thống");
        if(request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
