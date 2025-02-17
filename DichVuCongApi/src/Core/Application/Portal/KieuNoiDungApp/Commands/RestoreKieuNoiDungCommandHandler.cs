using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApiation.Portal.KieuNoiDungApp.Commands;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Commands;
public class RestoreKieuNoiDungCommandHandler : ICommandHandler<RestoreKieuNoiDungCommand>
{
    private readonly IRepositoryWithEvents<KieuNoiDung> _repositoryWithEvents;
    public RestoreKieuNoiDungCommandHandler(IRepositoryWithEvents<KieuNoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(RestoreKieuNoiDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Kiểu nội dung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKieuNoiDung = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKieuNoiDung, cancellationToken);
        return (Result)Result.Success();
    }
}
