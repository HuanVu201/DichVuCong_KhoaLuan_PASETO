using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
public class UpdateLoaiNhomGiayToCaNhanCommandHandler : ICommandHandler<UpdateLoaiNhomGiayToCaNhanCommand>
{
    private readonly IRepositoryWithEvents<LoaiNhomGiayToCaNhan> _repositoryWithEvents;

    public UpdateLoaiNhomGiayToCaNhanCommandHandler(IRepositoryWithEvents<LoaiNhomGiayToCaNhan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateLoaiNhomGiayToCaNhanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiNhomGiayToCaNhan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedPAKN = itemExitst.Update(request.Ten, request.SoDinhDanh, request.GhiChu, request.Loai);
        await _repositoryWithEvents.UpdateAsync(updatedPAKN, cancellationToken);
        return (Result)Result.Success();
    }
}