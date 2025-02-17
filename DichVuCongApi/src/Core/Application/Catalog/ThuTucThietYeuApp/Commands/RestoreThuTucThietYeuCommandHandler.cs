using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Commands;
public class RestoreThuTucThietYeuCommandHandler : ICommandHandler<RestoreThuTucThietYeuCommand>
{
    private readonly IRepositoryWithEvents<ThuTucThietYeu> _repositoryWithEvents;
    public RestoreThuTucThietYeuCommandHandler(IRepositoryWithEvents<ThuTucThietYeu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreThuTucThietYeuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThuTucThietYeu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}