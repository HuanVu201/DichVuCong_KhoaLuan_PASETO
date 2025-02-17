using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
public class DeleteLoaiNhomGiayToCaNhanCommandHandler : ICommandHandler<DeleteLoaiNhomGiayToCaNhanCommand>
{
    private readonly IRepositoryWithEvents<LoaiNhomGiayToCaNhan> _repositoryWithEvents;
    public DeleteLoaiNhomGiayToCaNhanCommandHandler(IRepositoryWithEvents<LoaiNhomGiayToCaNhan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteLoaiNhomGiayToCaNhanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiNhomGiayToCaNhan với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
