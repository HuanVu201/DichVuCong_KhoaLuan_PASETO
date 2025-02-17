using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;
public class RestoreLinhVucCommandHandler : ICommandHandler<RestoreLinhVucCommand>
{
    private readonly IRepositoryWithEvents<LinhVuc> _repositoryWithEvents;
    public RestoreLinhVucCommandHandler(IRepositoryWithEvents<LinhVuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreLinhVucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LinhVuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
