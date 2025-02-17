using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Commands;
public class RestoreTrangThaiHoSoCommandHandler : ICommandHandler<RestoreTrangThaiHoSoCommand>
{
    private readonly IRepositoryWithEvents<TrangThaiHoSo> _repositoryWithEvents;
    public RestoreTrangThaiHoSoCommandHandler(IRepositoryWithEvents<TrangThaiHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreTrangThaiHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TrangThaiHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
