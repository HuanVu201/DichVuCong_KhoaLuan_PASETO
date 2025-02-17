using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
public class DeleteCauHoiPhoBienCommandHandler : ICommandHandler<DeleteCauHoiPhoBienCommand>
{
    private readonly IRepositoryWithEvents<CauHoiPhoBien> _repositoryWithEvents;
    public DeleteCauHoiPhoBienCommandHandler(IRepositoryWithEvents<CauHoiPhoBien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteCauHoiPhoBienCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"CauHoiPhoBien với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
