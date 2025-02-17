using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;

public class UpdateApiChiaSeCommandHandler : ICommandHandler<UpdateApiChiaSeCommand>
{
    private readonly IRepositoryWithEvents<APIChiaSe> _repositoryWithEvents;
    private readonly IMediator _mediator;

    public UpdateApiChiaSeCommandHandler(IRepositoryWithEvents<APIChiaSe> repositoryWithEvents, IMediator mediator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mediator = mediator;
    }

    public async Task<Result> Handle(UpdateApiChiaSeCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"APIChiaSe với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedApiChiaSe = itemExitst.Update(request.MaApiChiaSe, request.TenApiChiaSe, request.NoiDung, request.GioiHan, request.DuongDan, null, null, request.ThamSoDauVao, request.ThamSoDauRa, request.HuongDanGoi);
        await _repositoryWithEvents.UpdateAsync(updatedApiChiaSe, cancellationToken);
        return (Result)Result.Success();

    }
}