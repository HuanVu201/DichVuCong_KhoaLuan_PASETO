using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Commands;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Commands;
public class DeleteTaiLieuGiayToCaNhanCommandHandler : ICommandHandler<DeleteTaiLieuGiayToCaNhanCommand>
{
    private readonly IRepositoryWithEvents<TaiLieuGiayToCaNhan> _repositoryWithEvents;
    public DeleteTaiLieuGiayToCaNhanCommandHandler(IRepositoryWithEvents<TaiLieuGiayToCaNhan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteTaiLieuGiayToCaNhanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TaiLieuGiayToCaNhan với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
