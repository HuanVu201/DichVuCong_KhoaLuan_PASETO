using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Commands;
public class RestoreQuanLyVanBanCommandHandler : ICommandHandler<RestoreQuanLyVanBanCommand>
{
    private readonly IRepositoryWithEvents<QuanLyVanBan> _repositoryWithEvents;
    public RestoreQuanLyVanBanCommandHandler(IRepositoryWithEvents<QuanLyVanBan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreQuanLyVanBanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyVanBan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
