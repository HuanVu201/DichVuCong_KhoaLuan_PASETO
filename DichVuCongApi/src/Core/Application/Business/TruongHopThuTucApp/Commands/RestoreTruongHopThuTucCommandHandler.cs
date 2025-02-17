using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Commands;
public class RestoreTruongHopThuTucCommandHandler : ICommandHandler<RestoreTruongHopThuTucCommand>
{
    private readonly IRepositoryWithEvents<TruongHopThuTuc> _repositoryWithEvents;
    public RestoreTruongHopThuTucCommandHandler(IRepositoryWithEvents<TruongHopThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreTruongHopThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TruongHopThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
