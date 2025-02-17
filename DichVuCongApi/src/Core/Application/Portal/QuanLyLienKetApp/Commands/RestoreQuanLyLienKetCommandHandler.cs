using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Commands;
public class RestoreQuanLyLienKetCommandHandler : ICommandHandler<RestoreQuanLyLienKetCommand>
{
    private readonly IRepositoryWithEvents<QuanLyLienKet> _repositoryWithEvents;
    public RestoreQuanLyLienKetCommandHandler(IRepositoryWithEvents<QuanLyLienKet> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreQuanLyLienKetCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyLienKet với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
