using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Commands;
public class RestoreFooterCommandHandler : ICommandHandler<RestoreFooterCommand>
{
    private readonly IRepositoryWithEvents<Footer> _repositoryWithEvents;
    public RestoreFooterCommandHandler(IRepositoryWithEvents<Footer> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreFooterCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Footer với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
