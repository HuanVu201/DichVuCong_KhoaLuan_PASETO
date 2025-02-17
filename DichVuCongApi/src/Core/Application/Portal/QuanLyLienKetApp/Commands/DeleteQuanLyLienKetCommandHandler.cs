using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Commands;
public class DeleteQuanLyLienKetCommandHandler : ICommandHandler<DeleteQuanLyLienKetCommand>
{
    private readonly IRepositoryWithEvents<QuanLyLienKet> _repositoryWithEvents;
    public DeleteQuanLyLienKetCommandHandler(IRepositoryWithEvents<QuanLyLienKet> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteQuanLyLienKetCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyLienKet với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
