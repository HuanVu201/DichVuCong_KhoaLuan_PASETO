using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class DeleteYeuCauThanhToanCommandHandler : ICommandHandler<DeleteYeuCauThanhToanCommand>
{
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    public DeleteYeuCauThanhToanCommandHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteYeuCauThanhToanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
        {
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        }
        else
        {
            var updatedItem = itemExitst.SoftDelete();
            await _repositoryWithEvents.UpdateAsync(updatedItem);
        }
        return (Result)Result.Success();
    }
}
