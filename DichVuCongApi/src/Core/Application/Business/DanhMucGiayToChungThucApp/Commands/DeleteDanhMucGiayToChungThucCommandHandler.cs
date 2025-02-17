using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Commands;
public class DeleteDanhMucGiayToChungThucCommandHandler : ICommandHandler<DeleteDanhMucGiayToChungThucCommand>
{
    private readonly IRepository<DanhMucGiayToChungThuc> _repositoryWithEvents;
    public DeleteDanhMucGiayToChungThucCommandHandler(IRepository<DanhMucGiayToChungThuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteDanhMucGiayToChungThucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhMucGiayToChungThuc với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
