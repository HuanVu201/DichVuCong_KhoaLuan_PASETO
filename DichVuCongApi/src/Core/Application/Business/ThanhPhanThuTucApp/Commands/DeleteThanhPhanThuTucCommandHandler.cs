using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class DeleteThanhPhanThuTucCommandHandler : ICommandHandler<DeleteThanhPhanThuTucCommand>
{
    private readonly IRepository<ThanhPhanThuTuc> _repositoryWithEvents;
    public DeleteThanhPhanThuTucCommandHandler(IRepository<ThanhPhanThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteThanhPhanThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThanhPhanThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
