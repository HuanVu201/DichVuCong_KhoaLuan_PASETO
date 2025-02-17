using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Commands;

public class DeleteThuTucLienQuanCommandHandler : ICommandHandler<DeleteThuTucLienQuanCommand>
{
    private readonly IRepositoryWithEvents<ThuTucLienQuan> _repositoryWithEvents;
    public DeleteThuTucLienQuanCommandHandler(IRepositoryWithEvents<ThuTucLienQuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteThuTucLienQuanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThuTucLienQuan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}