using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
public class DeleteMaVanDonBuuDienCommandHandler : ICommandHandler<DeleteMaVanDonBuuDienCommand>
{
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;
    public DeleteMaVanDonBuuDienCommandHandler(IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteMaVanDonBuuDienCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Mã vận đơn với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
