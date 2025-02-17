using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
public class DeleteGiayToSoHoaChiaSeCommandHandler : ICommandHandler<DeleteGiayToSoHoaChiaSeCommand>
{
    private readonly IRepository<GiayToSoHoaChiaSe> _repositoryWithEvents;
    public DeleteGiayToSoHoaChiaSeCommandHandler(IRepository<GiayToSoHoaChiaSe> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteGiayToSoHoaChiaSeCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToSoHoaChiaSe với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}