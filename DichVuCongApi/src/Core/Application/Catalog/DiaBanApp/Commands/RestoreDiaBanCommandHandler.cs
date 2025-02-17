using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
public class RestoreDiaBanCommandHandler : ICommandHandler<RestoreDiaBanCommand>
{
    private readonly IRepositoryWithEvents<DiaBan> _repositoryWithEvents;
    public RestoreDiaBanCommandHandler(IRepositoryWithEvents<DiaBan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreDiaBanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Địa bàn với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedDiaBan = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedDiaBan, cancellationToken);
        return (Result)Result.Success();
    }
}
