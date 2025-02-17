using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
using TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;
public class DeletePhieuKhaoSatCommandHandler : ICommandHandler<DeletePhieuKhaoSatCommand>
{
    private readonly IRepositoryWithEvents<PhieuKhaoSat> _repositoryWithEvents;
    public DeletePhieuKhaoSatCommandHandler(IRepositoryWithEvents<PhieuKhaoSat> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeletePhieuKhaoSatCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Phiếu khảo sát với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
