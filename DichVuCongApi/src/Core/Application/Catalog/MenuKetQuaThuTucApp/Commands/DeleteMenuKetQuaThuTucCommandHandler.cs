using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Commands;
public class DeleteMenuKetQuaThuTucCommandHandler : ICommandHandler<DeleteMenuKetQuaThuTucCommand>
{
    private readonly IRepositoryWithEvents<MenuKetQuaThuTuc> _repositoryWithEvents;
    public DeleteMenuKetQuaThuTucCommandHandler(IRepositoryWithEvents<MenuKetQuaThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteMenuKetQuaThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
        {
            //await _repositoryWithEvents.DeleteAsync(itemExitst);
            //return (Result)Result.Success();
        }

        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
