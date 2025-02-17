using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Commands;

public class DeleteThuTucThietYeuCommandHandler : ICommandHandler<DeleteThuTucThietYeuCommand>
{
    private readonly IRepositoryWithEvents<ThuTucThietYeu> _repositoryWithEvents;
    public DeleteThuTucThietYeuCommandHandler(IRepositoryWithEvents<ThuTucThietYeu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteThuTucThietYeuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThuTucThietYeu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}