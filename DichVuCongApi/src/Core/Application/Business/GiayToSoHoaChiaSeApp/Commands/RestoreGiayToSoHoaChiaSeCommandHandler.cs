using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
public class RestoreGiayToSoHoaChiaSeCommandHandler : ICommandHandler<RestoreGiayToSoHoaChiaSeCommand>
{
    private readonly IRepository<GiayToSoHoaChiaSe> _repositoryWithEvents;
    public RestoreGiayToSoHoaChiaSeCommandHandler(IRepository<GiayToSoHoaChiaSe> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreGiayToSoHoaChiaSeCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToSoHoaChiaSe với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}