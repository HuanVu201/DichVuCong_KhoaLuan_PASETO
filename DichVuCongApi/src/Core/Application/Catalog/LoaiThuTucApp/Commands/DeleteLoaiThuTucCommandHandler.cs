using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;
public class DeleteLoaiThuTucCommandHandler : ICommandHandler<DeleteLoaiThuTucCommand>
{
    private readonly IRepositoryWithEvents<LoaiThuTuc> _repositoryWithEvents;
    public DeleteLoaiThuTucCommandHandler(IRepositoryWithEvents<LoaiThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteLoaiThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
