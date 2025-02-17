using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
public class RestoreCauHoiPhoBienCommandHandler : ICommandHandler<RestoreCauHoiPhoBienCommand>
{
    private readonly IRepositoryWithEvents<CauHoiPhoBien> _repositoryWithEvents;
    public RestoreCauHoiPhoBienCommandHandler(IRepositoryWithEvents<CauHoiPhoBien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreCauHoiPhoBienCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"CauHoiPhoBien với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
