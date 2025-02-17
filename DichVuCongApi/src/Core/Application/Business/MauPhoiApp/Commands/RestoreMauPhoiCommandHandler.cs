using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;

public class RestoreMauPhoiCommandHandler : ICommandHandler<RestoreMauPhoiCommand>
{
    private readonly IRepository<MauPhoi> _repositoryWithEvents;
    public RestoreMauPhoiCommandHandler(IRepository<MauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhoi với mã: {request.Id} chưa được thêm vào hệ thống");
        var mauPhoi = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(mauPhoi, cancellationToken);
        return (Result)Result.Success();
    }
}