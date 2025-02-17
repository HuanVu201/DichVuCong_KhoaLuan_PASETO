using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
public class RestoreThanhPhanHoSoCommandHandler : ICommandHandler<RestoreThanhPhanHoSoCommand>
{
    private readonly IRepository<ThanhPhanHoSo> _repositoryWithEvents;
    public RestoreThanhPhanHoSoCommandHandler(IRepository<ThanhPhanHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreThanhPhanHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThanhPhanHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
