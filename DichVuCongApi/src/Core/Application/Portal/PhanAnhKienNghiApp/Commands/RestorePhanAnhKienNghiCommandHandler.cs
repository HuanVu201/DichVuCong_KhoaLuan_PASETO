using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
public class RestorePhanAnhKienNghiCommandHandler : ICommandHandler<RestorePhanAnhKienNghiCommand>
{
    private readonly IRepositoryWithEvents<PhanAnhKienNghi> _repositoryWithEvents;
    public RestorePhanAnhKienNghiCommandHandler(IRepositoryWithEvents<PhanAnhKienNghi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestorePhanAnhKienNghiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"PhanAnhKienNghi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
