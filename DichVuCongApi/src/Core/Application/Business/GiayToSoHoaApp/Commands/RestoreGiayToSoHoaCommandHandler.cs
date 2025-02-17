using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
public class RestoreGiayToSoHoaCommandHandler : ICommandHandler<RestoreGiayToSoHoaCommand>
{
    private readonly IRepository<GiayToSoHoa> _repositoryWithEvents;
    public RestoreGiayToSoHoaCommandHandler(IRepository<GiayToSoHoa> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreGiayToSoHoaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiayToSoHoa với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
