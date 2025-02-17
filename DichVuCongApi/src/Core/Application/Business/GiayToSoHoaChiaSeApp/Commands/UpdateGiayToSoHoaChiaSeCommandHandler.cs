using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
public class UpdateGiayToSoHoaChiaSeCommandHandler : ICommandHandler<UpdateGiayToSoHoaChiaSeCommand>
{
    private readonly IRepository<GiayToSoHoaChiaSe> _repositoryWithEvents;

    public UpdateGiayToSoHoaChiaSeCommandHandler(IRepository<GiayToSoHoaChiaSe> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateGiayToSoHoaChiaSeCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToSoHoaChiaSe với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedGiayToSoHoaChiaSe = itemExitst.Update(request.MaDinhDanhChiaSe);
        await _repositoryWithEvents.UpdateAsync(updatedGiayToSoHoaChiaSe, cancellationToken);
        return (Result)Result.Success();
    }
}