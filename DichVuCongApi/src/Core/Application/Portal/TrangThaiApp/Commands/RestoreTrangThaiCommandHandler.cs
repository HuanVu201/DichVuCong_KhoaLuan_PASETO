using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;
public class RestoreTrangThaiCommandHandler : ICommandHandler<RestoreTrangThaiCommand>
{
    private readonly IRepositoryWithEvents<TrangThai> _repositoryWithEvents;
    public RestoreTrangThaiCommandHandler(IRepositoryWithEvents<TrangThai> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(RestoreTrangThaiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Trạng thái với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
