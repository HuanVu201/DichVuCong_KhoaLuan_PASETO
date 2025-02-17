using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
public class DeleteMauPhoiCommandHandler : ICommandHandler<DeleteMauPhoiCommand>
{
    private readonly IRepository<MauPhoi> _repositoryWithEvents;
    public DeleteMauPhoiCommandHandler(IRepository<MauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhoi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}