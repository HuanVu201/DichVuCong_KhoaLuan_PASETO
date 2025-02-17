using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class RestoreDonViThuTucCommandHandler : ICommandHandler<RestoreDonViThuTucCommand>
{
    private readonly IRepositoryWithEvents<DonViThuTuc> _repositoryWithEvents;
    public RestoreDonViThuTucCommandHandler(IRepositoryWithEvents<DonViThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreDonViThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DonViThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
