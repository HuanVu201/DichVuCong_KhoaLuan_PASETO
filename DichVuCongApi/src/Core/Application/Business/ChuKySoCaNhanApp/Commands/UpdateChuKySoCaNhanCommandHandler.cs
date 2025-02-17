using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Commands;
public class UpdateChuKySoCaNhanCommandHandler : ICommandHandler<UpdateChuKySoCaNhanCommand>
{
    private readonly IRepository<ChuKySoCaNhan> _repositoryWithEvents;

    public UpdateChuKySoCaNhanCommandHandler(IRepository<ChuKySoCaNhan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateChuKySoCaNhanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ChuKySoCaNhan với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedChuKySoCaNhan = itemExitst.Update(request.HinhAnh, request.MoTa);
        await _repositoryWithEvents.UpdateAsync(updatedChuKySoCaNhan, cancellationToken);
        return (Result)Result.Success();
    }
}