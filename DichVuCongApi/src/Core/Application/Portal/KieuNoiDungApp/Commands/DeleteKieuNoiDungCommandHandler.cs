using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Commands;
public class DeleteKieuNoiDungCommandHandler : ICommandHandler<DeleteKieuNoiDungCommand>
{
    private readonly IRepositoryWithEvents<KieuNoiDung> _repositoryWithEvents;
    public DeleteKieuNoiDungCommandHandler(IRepositoryWithEvents<KieuNoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteKieuNoiDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Kiểu nội dung với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
