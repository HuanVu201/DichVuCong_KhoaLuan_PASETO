using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Commands;
public class DeleteHuongDanNopHoSoCommandHandler : ICommandHandler<DeleteHuongDanNopHoSoCommand>
{
    private readonly IRepositoryWithEvents<HuongDanNopHoSo> _repositoryWithEvents;
    public DeleteHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<HuongDanNopHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HuongDanNopHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
