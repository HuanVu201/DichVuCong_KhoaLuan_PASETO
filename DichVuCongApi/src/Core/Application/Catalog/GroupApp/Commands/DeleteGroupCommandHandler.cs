using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
public class DeleteGroupCommandHandler : ICommandHandler<DeleteGroupCommand>
{
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    public DeleteGroupCommandHandler(IRepositoryWithEvents<Group> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Cơ cấu tổ chức với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
