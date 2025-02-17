using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Commands;
public class RestoreMenuKetQuaThuTucCommandHandler : ICommandHandler<RestoreMenuKetQuaThuTucCommand>
{
    private readonly IRepositoryWithEvents<MenuKetQuaThuTuc> _repositoryWithEvents;
    public RestoreMenuKetQuaThuTucCommandHandler(IRepositoryWithEvents<MenuKetQuaThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreMenuKetQuaThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
