using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Commands;
public class RestoreBuocXuLyCommandHandler : ICommandHandler<RestoreBuocXuLyCommand>
{
    private readonly IRepositoryWithEvents<BuocXuLy> _repositoryWithEvents;
    public RestoreBuocXuLyCommandHandler(IRepositoryWithEvents<BuocXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreBuocXuLyCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"BuocXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
