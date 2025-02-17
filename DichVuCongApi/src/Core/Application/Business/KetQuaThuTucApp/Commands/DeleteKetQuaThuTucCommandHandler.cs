using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Commands;
public class DeleteKetQuaLienQuanCommandHandler : ICommandHandler<DeleteKetQuaThuTucCommand>
{
    private readonly IRepository<KetQuaThuTuc> _repositoryWithEvents;
    public DeleteKetQuaLienQuanCommandHandler(IRepository<KetQuaThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteKetQuaThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KetQuaThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        //await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
