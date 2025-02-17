using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
public class RestoreMaVanDonBuuDienCommandHandler : ICommandHandler<RestoreMaVanDonBuuDienCommand>
{
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;
    public RestoreMaVanDonBuuDienCommandHandler(IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreMaVanDonBuuDienCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Mã vận đơn với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedMaVanDonBuuDien = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedMaVanDonBuuDien, cancellationToken);
        return (Result)Result.Success();
    }
}
