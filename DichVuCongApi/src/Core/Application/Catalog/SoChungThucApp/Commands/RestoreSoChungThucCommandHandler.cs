using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
public class RestoreSoChungThucCommandHandler : ICommandHandler<RestoreSoChungThucCommand>
{
    private readonly IRepositoryWithEvents<SoChungThuc> _repositoryWithEvents;
    public RestoreSoChungThucCommandHandler(IRepositoryWithEvents<SoChungThuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreSoChungThucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Địa bàn với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedSoChungThuc = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedSoChungThuc, cancellationToken);
        return (Result)Result.Success();
    }
}
