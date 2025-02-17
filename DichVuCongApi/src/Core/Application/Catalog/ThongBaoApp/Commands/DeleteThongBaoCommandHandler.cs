using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Commands;
public class DeleteThongBaoCommandHandler : ICommandHandler<DeleteThongBaoCommand>
{
    private readonly IRepositoryWithEvents<ThongBao> _repositoryWithEvents;
    public DeleteThongBaoCommandHandler(IRepositoryWithEvents<ThongBao> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteThongBaoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThongBao với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
