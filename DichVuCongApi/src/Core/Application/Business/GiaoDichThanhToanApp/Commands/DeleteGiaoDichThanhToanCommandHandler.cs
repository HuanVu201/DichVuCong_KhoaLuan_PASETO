using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
public class DeleteGiaoDichThanhToanCommandHandler : ICommandHandler<DeleteGiaoDichThanhToanCommand>
{
    private readonly IRepositoryWithEvents<GiaoDichThanhToan> _repositoryWithEvents;
    public DeleteGiaoDichThanhToanCommandHandler(IRepositoryWithEvents<GiaoDichThanhToan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteGiaoDichThanhToanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiaoDichThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
