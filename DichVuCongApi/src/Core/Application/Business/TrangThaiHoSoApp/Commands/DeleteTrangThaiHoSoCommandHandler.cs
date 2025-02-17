using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Commands;
public class DeleteTrangThaiHoSoCommandHandler : ICommandHandler<DeleteTrangThaiHoSoCommand>
{
    private readonly IRepositoryWithEvents<TrangThaiHoSo> _repositoryWithEvents;
    public DeleteTrangThaiHoSoCommandHandler(IRepositoryWithEvents<TrangThaiHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteTrangThaiHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TrangThaiHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
