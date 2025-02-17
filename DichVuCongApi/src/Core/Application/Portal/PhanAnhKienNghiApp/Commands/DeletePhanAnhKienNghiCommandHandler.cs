using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
public class DeletePhanAnhKienNghiCommandHandler : ICommandHandler<DeletePhanAnhKienNghiCommand>
{
    private readonly IRepositoryWithEvents<PhanAnhKienNghi> _repositoryWithEvents;
    public DeletePhanAnhKienNghiCommandHandler(IRepositoryWithEvents<PhanAnhKienNghi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeletePhanAnhKienNghiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"PhanAnhKienNghi với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
