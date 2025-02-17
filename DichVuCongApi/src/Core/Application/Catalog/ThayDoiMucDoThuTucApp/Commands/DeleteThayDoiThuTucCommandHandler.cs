using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Commands;
public class DeleteThayDoiThuTucCommandHandler : ICommandHandler<DeleteThayDoiThuTucCommand>
{
    private readonly IRepositoryWithEvents<ThayDoiMucDoThuTuc> _repositoryWithEvents;
    public DeleteThayDoiThuTucCommandHandler(IRepositoryWithEvents<ThayDoiMucDoThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(DeleteThayDoiThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThayDoiMucDoThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
