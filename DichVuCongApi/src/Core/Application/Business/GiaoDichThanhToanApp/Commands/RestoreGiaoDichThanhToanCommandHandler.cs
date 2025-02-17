using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
public class RestoreGiaoDichThanhToanCommandHandler : ICommandHandler<RestoreGiaoDichThanhToanCommand>
{
    private readonly IRepositoryWithEvents<GiaoDichThanhToan> _repositoryWithEvents;
    public RestoreGiaoDichThanhToanCommandHandler(IRepositoryWithEvents<GiaoDichThanhToan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreGiaoDichThanhToanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiaoDichThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
