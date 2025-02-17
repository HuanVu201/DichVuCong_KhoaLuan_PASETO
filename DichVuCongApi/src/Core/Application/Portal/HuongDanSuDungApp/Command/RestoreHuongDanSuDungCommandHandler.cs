using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Commands;
public class RestoreHuongDanSuDungCommandHandler : ICommandHandler<RestoreHuongDanSuDungCommand>
{
    private readonly IRepositoryWithEvents<HuongDanSuDung> _repositoryWithEvents;
    public RestoreHuongDanSuDungCommandHandler(IRepositoryWithEvents<HuongDanSuDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreHuongDanSuDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HuongDanSuDung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}



