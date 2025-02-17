using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public class DeleteThanhPhanHuongDanNopHoSoCommandHandler : ICommandHandler<DeleteThanhPhanHuongDanNopHoSoCommand>
{
    private readonly IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> _repositoryWithEvents;
    public DeleteThanhPhanHuongDanNopHoSoCommandHandler(IRepositoryWithEvents<ThanhPhanHuongDanNopHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteThanhPhanHuongDanNopHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThanhPhanHuongDanNopHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
